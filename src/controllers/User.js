import db from "../config/userDatabase"

export function validateAccess(code, access = new Date) {
    const user = db
        .get('users')
        .find({ code })
        .value()

    console.log('usuario: ', validateAccessTime(user, access))
    if (!user)
        return false

    if (user.inside) {
        registerUserExit(user.id, access)
        return true
    }
    else if (validateAccessTime(user, access)) {
        registerUserAccess(user.id, access)
        return true
    }
    return false

}

/**
 * Valida momento de acesso do usuário 
 * @param {Number} user Objeto de usuári
 * @param {Date} [access=new Date] Hora do acesso
 */
function validateAccessTime(user, access = new Date) {
    const weekDay = access.getDay(),
        hour = access.getHours()

    return user.rules.find(
        ({ begin, end, weekDays }) =>
            weekDays[weekDay] && hour >= begin && hour < end
    )
}

/**
 * Registra entrada de usuário
 *
 * @param {Number} id ID do usuário
 * @param {Date} [entrance=new Date] Momento de entrada
 */
function registerUserAccess(id, entrance = new Date) {
    db.get('users')
        .find({ id })
        .assign({ inside: true })
        .get('accessLog')
        .push({ entrance })
        .write()
}

/**
 * Registra saída do usuário
 *
 * @param {Number} id Id do usuário
 * @param {Date} [exit=new Date] Data de saída
 */
function registerUserExit(id, exit = new Date) {
    db.get('users')
        .find({ id })
        .assign({ inside: false })
        .get('accessLog')
        .last()
        .assign({ exit })
        .write()
}