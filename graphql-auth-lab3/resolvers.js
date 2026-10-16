import bcrypt from "bcryptjs";
import { users, getNextUserId } from "./data.js";
import { createToken } from "./auth.js";

const lessons = [];
let nextLessonId = 1;

export const resolvers = {
    Query: {
        // Список усіх користувачів (без паролів - їх немає у типі User)
        users() {
            return users;
        },

        // Поточний авторизований користувач (з context)
        me(parent, args, context) {
            return context.user;
        },

        // Список усіх уроків
        lessons() {
            return lessons;
        },
    },

    Mutation: {
        async register(parent, args) {
            const { name, email, password } = args;
            const existingUser = users.find((user) => user.email === email);
            if (existingUser) {
                throw new Error("Користувач з таким email вже існує.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: getNextUserId(),
                name,
                email,
                password: hashedPassword,
            };
            users.push(newUser);

            return { token: createToken(newUser), user: newUser };
        },

        async login(parent, args) {
            const { email, password } = args;
            const user = users.find((item) => item.email === email);
            if (!user) {
                throw new Error("Користувача з таким email не знайдено.");
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error("Неправильний пароль.");
            }

            return { token: createToken(user), user };
        },

        // Захищена мутація: створити урок може лише авторизований користувач
        createLesson(parent, args, context) {
            if (!context.user) {
                throw new Error("Потрібна авторизація.");
            }

            const lesson = {
                id: String(nextLessonId++),
                title: args.title,
                level: args.level,
                language: args.language,
                author: context.user,
            };
            lessons.push(lesson);
            return lesson;
        },

        deleteLesson(parent, args, context) {
            if (!context.user) {
                throw new Error("Потрібна авторизація.");
            }

            const index = lessons.findIndex((lesson) => lesson.id === args.id);
            if (index === -1) return false;

            lessons.splice(index, 1);
            return true;
        },
    },
};