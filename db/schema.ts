import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";
import { string } from "zod";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull().unique(),
    bio: text("bio"),
    website: text("website"),
    location: text("location"),
    avatar: text("avatar"),
    banner: text("banner"),
});

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    author: integer("author_id").references(() => users.id),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    likes: integer("likes").default(0),
    reposts: integer("reposts").default(0),
})

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => users.id).notNull(),
    postId: integer("postId").references(() => posts.id, { onDelete: "cascade"}).notNull(),
    content: text("content").notNull(),
    created_at: timestamp("created_at").defaultNow(),
})

export const likes = pgTable("likes", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id, { onDelete: "cascade"})
        .notNull()
})

export const reposts = pgTable("reposts", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id, { onDelete: "cascade"})
        .notNull(),
})

export const bookmark = pgTable("bookmark", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id, { onDelete: "cascade"})
        .notNull()
})

export const userRelations = relations(users, ({many}) => ({
    posts: many(posts),
    likes: many(likes),
    reposts: many(reposts),
    bookmarks: many(bookmark)
}));

export const postRelations = relations(posts, ({one, many}) => ({
    author : one(users, {
        fields: [posts.author],
        references: [users.id],
    }),
    likes: many(likes),
    reposts: many(reposts),
    bookmarks: many(bookmark)
}));

export const likeRelations = relations(likes, ({one}) => ({
    post: one(posts, {
        fields: [likes.postID],
        references: [posts.id],
    }),

    user: one(users, {
        fields: [likes.userID],
        references: [users.id]
    })
}))

export const repostsRelations = relations(reposts, ({one}) => ({
    post: one(posts, {
        fields: [reposts.postID],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [reposts.userID],
        references: [users.id]
    })
}))

export const bookmarkRelations = relations(bookmark, ({one}) => ({
    post: one(posts, {
        fields: [bookmark.postID],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [bookmark.userID],
        references: [users.id]
    })
}))

export const commentsRelations = relations(comments, ({one}) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [comments.userId],
        references: [users.id]
    })
}))
