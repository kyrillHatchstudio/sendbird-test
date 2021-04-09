import { ChatbotModule } from "./chatbot-module.model";

export interface ChatbotModules {
  serviceId: string;
  url: string;
  chatbotModules: ChatbotModule & { index: string };
  countModules: number;
}
