/** Representa o usuário autor da mensagem */
export interface MessageAuthor {
  _id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
}

/** Representa uma mensagem */
export interface Message {
username: any;
  id(id: any): unknown;
  _id: string;
  content: string;
  author: MessageAuthor;
  createdAt: string;
}
