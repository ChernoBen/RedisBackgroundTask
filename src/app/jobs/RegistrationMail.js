import Mail from '../lib/Mail';
export default{
    key:'RegistrationMail',
    async handle({data}){
        const {user} = data;
        await Mail.sendMail({
            from:"Benja <benjamim.francisco@hotmail.com>",
            to:`${user.name} <${user.email}>`,
            subject:"Teste filas com redis",
            html:`Olá,${user.name}, bem vindo ao sistema de testes de fila usando redis`
        })
    }
}