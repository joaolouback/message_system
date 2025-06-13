// frontend/src/app/auth/user.models.ts

export class User {
    constructor(
        public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string,
        public avatarFile?: File    // ← adiciona o arquivo de avatar para o signup
    ) { }
}
