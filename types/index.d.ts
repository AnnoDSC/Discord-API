export interface User {
  id: string;
  username: string;
  discriminator: string;
}

export interface Guild {
  id: string;
  name: string;
  fetch(): Promise<Guild>;
}

export interface Message {
  id: string;
  content: string;
  channelId: string;
  author: User;
  guildId: string | null;
  reply(content: string): Promise<void>;
  guild: Guild | null;
}

export interface ClientOptions {
  token: string;
  intents?: string[];
}

export declare class Client {
  constructor(options: ClientOptions);
  user: User;
  on(event: 'ready', listener: () => void): void;
  on(event: 'messageCreate', listener: (message: Message) => void): void;
  on(event: 'error', listener: (err: Error) => void): void;
  login(): void;
  sendMessage(channelId: string, content: string): Promise<any>;
  getGuild(guildId: string): Promise<Guild>;
}

declare global {
  type User = import('./index').User;
  type Guild = import('./index').Guild;
  type Message = import('./index').Message;
  type Client = import('./index').Client;
}