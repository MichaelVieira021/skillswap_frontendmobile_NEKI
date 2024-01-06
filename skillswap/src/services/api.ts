import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://10.0.0.149:8080/api'
})

//CONFIG TOKEN
export const configurarToken = (token: string) => {
    api.defaults.headers.common['Authorization'] = token;
};

export function verificarToken(token: string){
    return api.post("/usuarios/validar/token", null, {
        params: {
            token: token 
        }
    });
};



//USER
export function verificarUsuario(login: string, senha: string){
    return api.post("/usuarios/login", {login, senha})
};

export function cadastrarNovoUsuario(login: string, senha: string){
    return api.post("/usuarios", {login, senha})
};


//SKILLS USER
export function skillsUser(userId: number){
    return api.get(`/usuarios/skillsUser?userId=${userId}`)
};

export function levelUp(id: number){
    return api.patch(`/usuarios/levelUp/skill/${id}`)
};

export function levelDown(id: number){
    return api.patch(`/usuarios/levelDown/skill/${id}`)
};

export function delUserSkill(id: number){
    return api.delete(`/usuarios/deletar/skill/${id}`)
};

export function adicionarSkillUser(idUser: number, idSkill: number, level: number){
    return api.post("/usuarios/adicionar/skill", null, {
        params: {
            idUser: idUser,
            idSkill: idSkill,
            level: level
        }
    });
};


//SKILL
export function obterTodasSkills(){
    return api.get("/skills")
};

export function obterTodasSkillsUserNot(userId: number){
    return api.get(`/skills/skillsUserNot?userId=${userId}`)
};

export function obterSkillPorId(id: number){
    return api.get(`/skills/${id}`)
};