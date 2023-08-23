import { Telegraf, Markup } from "telegraf";
import "dotenv/config";
import { getComments, getSystems } from "./api";
import { Comment, System } from "./@types";

const bot = new Telegraf(process.env.TG_TOKEN!);

let selectedSystemID = "";
let selectedCommentID = "";
let systems: System[];
let selectedComments: Comment[];

const loadData = async () => {
  systems = await getSystems();
};

try {
  loadData();
  bot.start((ctx) => {
    ctx.reply(
      "Добро пожаловать в бота Helper, Вы можете получить список систем, затем выбрать замечание для определенной системы и решения для этого замечания",
      Markup.inlineKeyboard([
        Markup.button.callback("Получить системы", "loadSystems"),
      ])
    );
  });

  bot.action("loadSystems", async (ctx) => {
    ctx.editMessageText(
      "Выберите систему из списка ниже, чтобы получить замечания по ней",
      Markup.inlineKeyboard(
        systems.map((e) => [
          Markup.button.callback(e.name, `loadComments:${e._id}`),
        ])
      )
    );
  });

  bot.action(/loadComments:[a-z0-9]/, async (ctx) => {
    // @ts-ignore
    selectedSystemID = ctx.callbackQuery.data.split(":")[1];
    selectedComments = await getComments(selectedSystemID);
    const btns = selectedComments.map((e) => [
      Markup.button.callback(e.content, `loadDecisions:${e._id}`),
    ]);

    btns.push([Markup.button.callback("Назад", "loadSystems")]);
    if(selectedComments.length < 1) return ctx.editMessageText(
      "У системы пока нет замечаний",
      Markup.inlineKeyboard(btns)
    );
    ctx.editMessageText(
      "Выберите замечание из списка ниже, чтобы получить решения",
      Markup.inlineKeyboard(btns)
    );
  });

  bot.action(/loadDecisions:[a-z0-9]/, async (ctx) => {
    // @ts-ignore
    selectedCommentID = ctx.callbackQuery.data.split(":")[1];
    if (!selectedComments)
      return ctx.editMessageText(
        "Что-то пошло не так",
        Markup.inlineKeyboard([
          Markup.button.callback("Назад", `loadComments:${selectedSystemID}`),
        ])
      );
    const comment = selectedComments.find((e) => e._id === selectedCommentID);
    if (comment!.decisions.length < 1)
      return ctx.editMessageText(
        "Замечание пока что не имеет решений",
        Markup.inlineKeyboard([
          Markup.button.callback("Назад", `loadComments:${selectedSystemID}`),
        ])
      );
    ctx.editMessageText(
      `
    Список решений для замечания «${comment?.content}»${comment?.decisions.map((e, i) => `\n\n${++i}. ${e.content}`)}
    `,
      Markup.inlineKeyboard([
        Markup.button.callback("Назад", `loadComments:${selectedSystemID}`),
      ])
    );
  });

  console.log("Bot started");
  bot.launch();
} catch (e: any) {
  console.log(e.message);
}
