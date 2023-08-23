"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
require("dotenv/config");
const api_1 = require("./api");
const bot = new telegraf_1.Telegraf(process.env.TG_TOKEN);
let selectedSystemID = "";
let selectedCommentID = "";
let systems;
let selectedComments;
const loadData = () => __awaiter(void 0, void 0, void 0, function* () {
    systems = yield (0, api_1.getSystems)();
});
try {
    loadData();
    bot.start((ctx) => {
        ctx.reply("Добро пожаловать в бота Helper, Вы можете получить список систем, затем выбрать замечание для определенной системы и решения для этого замечания", telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("Получить системы", "loadSystems"),
        ]));
    });
    bot.action("loadSystems", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        ctx.editMessageText("Выберите систему из списка ниже, чтобы получить замечания по ней", telegraf_1.Markup.inlineKeyboard(systems.map((e) => [
            telegraf_1.Markup.button.callback(e.name, `loadComments:${e._id}`),
        ])));
    }));
    bot.action(/loadComments:[a-z0-9]/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        selectedSystemID = ctx.callbackQuery.data.split(":")[1];
        selectedComments = yield (0, api_1.getComments)(selectedSystemID);
        const btns = selectedComments.map((e) => [
            telegraf_1.Markup.button.callback(e.content, `loadDecisions:${e._id}`),
        ]);
        btns.push([telegraf_1.Markup.button.callback("Назад", "loadSystems")]);
        if (selectedComments.length < 1)
            return ctx.editMessageText("У системы пока нет замечаний", telegraf_1.Markup.inlineKeyboard(btns));
        ctx.editMessageText("Выберите замечание из списка ниже, чтобы получить решения", telegraf_1.Markup.inlineKeyboard(btns));
    }));
    bot.action(/loadDecisions:[a-z0-9]/, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
        // @ts-ignore
        selectedCommentID = ctx.callbackQuery.data.split(":")[1];
        if (!selectedComments)
            return ctx.editMessageText("Что-то пошло не так", telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("Назад", `loadComments:${selectedSystemID}`),
            ]));
        const comment = selectedComments.find((e) => e._id === selectedCommentID);
        if (comment.decisions.length < 1)
            return ctx.editMessageText("Замечание пока что не имеет решений", telegraf_1.Markup.inlineKeyboard([
                telegraf_1.Markup.button.callback("Назад", `loadComments:${selectedSystemID}`),
            ]));
        ctx.editMessageText(`
    Список решений для замечания «${comment === null || comment === void 0 ? void 0 : comment.content}»${comment === null || comment === void 0 ? void 0 : comment.decisions.map((e, i) => `\n\n${++i}. ${e.content}`)}
    `, telegraf_1.Markup.inlineKeyboard([
            telegraf_1.Markup.button.callback("Назад", `loadComments:${selectedSystemID}`),
        ]));
    }));
    console.log("Bot started");
    bot.launch();
}
catch (e) {
    console.log(e.message);
}
