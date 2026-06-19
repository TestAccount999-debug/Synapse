import { pgTable, serial, text, integer, timestamp, boolean, PgTable } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull().unique(),
    role: text("role").default("user").notNull(),
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
    image: text("image")
})

export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    userId: integer("userId").references(() => users.id).notNull(),
    postId: integer("postId").references(() => posts.id, { onDelete: "cascade" }).notNull(),
    content: text("content").notNull(),
    created_at: timestamp("created_at").defaultNow(),
})

export const notifications = pgTable("notifications", {
    id: serial("id").primaryKey(),
    recipientId: integer("recipient_id").references(() => users.id).notNull(),
    senderId: integer("sender_id").references(() => users.id).notNull(),
    type: text("type").notNull(),
    postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
    isRead: boolean("is_read").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
})

export const likes = pgTable("likes", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id, { onDelete: "cascade" })
        .notNull()
})

export const reposts = pgTable("reposts", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id, { onDelete: "cascade" })
        .notNull(),
})

export const bookmark = pgTable("bookmark", {
    userID: integer("userID")
        .references(() => users.id)
        .notNull(),

    postID: integer("postID")
        .references(() => posts.id, { onDelete: "cascade" })
        .notNull()
})

export const follows = pgTable("follows", {
    followerID: integer("followerID")
        .references(() => users.id)
        .notNull(),

    followingID: integer("followingID")
        .references(() => users.id)
        .notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull()
})

export const reports = pgTable("reports", {
    id: serial("id").primaryKey(),
    reporterId: integer("reporter_id").references(() => users.id, { onDelete: "cascade" }),
    postId: integer("post_id").references(() => posts.id, { onDelete: "cascade" }),
    reason: text("reason").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})

export const feedback = pgTable("feedback", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
    email: text("email").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
})

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts),
    likes: many(likes),
    reposts: many(reposts),
    bookmarks: many(bookmark),
    comments: many(comments),
    receivedNotifications: many(notifications, { relationName: "recipient" }),
    sentNotifications: many(notifications, { relationName: "sender" }),
}));

export const postRelations = relations(posts, ({ one, many }) => ({
    author: one(users, {
        fields: [posts.author],
        references: [users.id],
    }),
    likes: many(likes),
    reposts: many(reposts),
    bookmarks: many(bookmark)
}));

export const likeRelations = relations(likes, ({ one }) => ({
    post: one(posts, {
        fields: [likes.postID],
        references: [posts.id],
    }),

    user: one(users, {
        fields: [likes.userID],
        references: [users.id]
    })
}))

export const repostsRelations = relations(reposts, ({ one }) => ({
    post: one(posts, {
        fields: [reposts.postID],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [reposts.userID],
        references: [users.id]
    })
}))

export const bookmarkRelations = relations(bookmark, ({ one }) => ({
    post: one(posts, {
        fields: [bookmark.postID],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [bookmark.userID],
        references: [users.id]
    })
}))

export const commentsRelations = relations(comments, ({ one }) => ({
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id]
    }),

    user: one(users, {
        fields: [comments.userId],
        references: [users.id]
    })
}))

export const notificationsRelations = relations(notifications, ({ one }) => ({
    recipient: one(users, {
        fields: [notifications.recipientId],
        references: [users.id],
        relationName: "recipient",
    }),

    sender: one(users, {
        fields: [notifications.senderId],
        references: [users.id],
        relationName: "sender",
    }),

    post: one(posts, {
        fields: [notifications.postId],
        references: [posts.id]
    })
}));

export const reportsRelations = relations(reports, ({ one }) => ({
    reporter: one(users, {
        fields: [reports.reporterId],
        references: [users.id]
    }),

    post: one(posts, {
        fields: [reports.postId],
        references: [posts.id]
    })
}))

export const feedbackRelations = relations(feedback, ({ one }) => ({
    user: one(users, {
        fields: [feedback.userId],
        references: [users.id]
    })
}))