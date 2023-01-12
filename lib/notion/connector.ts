import { Client } from '@notionhq/client';
import { CreatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import env from '../../env';
import debug from 'debug';

const ll = debug('notionbot::notionConnector');

const notion = new Client({
    auth: env!.NOTION_TOKEN,
});

const taskDB = env!.NOTION_TASK_DB;

export default {
    createTask: function (title: string): Promise<CreatePageResponse> {
        ll('creating task', title, 'from');
        return notion.pages.create({
            parent: {
                database_id: taskDB
            },
            properties: {
                Title: {
                    type: "title",
                    title: [
                        {
                            type: "text",
                            text: {
                                content: title
                            }
                        }
                    ]
                }
            }

        });
    },
    convertTaskToUrl: function (task: CreatePageResponse): string {
        return task.id.replace(/-/g, ''); // конвертируем id в рабочий для ссылки
    }
};
