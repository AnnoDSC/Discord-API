// types.d.ts

export interface User {
  id: string;
  username: string;
  discriminator: string;
}

export interface Message {
  content: string;
  author: User;
  channelId: string;
  guild: {
    id: string;
  };
  reply: (content: string) => void;
}

export interface ClientOptions {
  token: string;
  intents?: string[];
}

export declare class Client {
  constructor(options: ClientOptions);
  user: User | null;
  on(event: 'ready', listener: () => void): void;
  on(event: 'messageCreate', listener: (message: Message) => void): void;
  on(event: 'error', listener: (err: Error) => void): void;
  login(): void;
  sendMessage(channelId: string, content: string): Promise<any>;
}
