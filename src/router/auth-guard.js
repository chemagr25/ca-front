export const isUserGuard = async (to, from, next) => {
    if (localStorage.getItem('roles') === 'ROLE_USER') {
        next()
        return
    }
    next({ name: 'login' })
    return
}

export const isTechGuard = async (to, from, next) => {
    if (localStorage.getItem('roles') === 'ROLE_MODERATOR') {
        next()
        return
    }
    next({ name: 'login' })
    return
}

export const isAdminGuard = async (to, from, next) => {
    if (localStorage.getItem('roles') === 'ROLE_ADMIN') {
        next()
        return
    }
    next({ name: 'login' })
    return
}
export const isAdmod = async (to, from, next) => {
    if (localStorage.getItem('roles') === 'ROLE_ADMIN' || localStorage.getItem('roles') === 'ROLE_MODERATOR') {
        next()
        return
    }
    next({ name: 'login' })
    return
}


export const loginGuard = async (to, from, next) => {
    if (!localStorage.getItem('token')) {
        next()
        return
    }
    next({ name: 'main-log' })
    return

}

export const loginGuard2 = async (to, from, next) => {
    if (localStorage.getItem('token')) {



        next()
        return
    }

    next({ name: 'main-log' })
    return

}

export const roleGuard = async (to, from, next) => {

    if (localStorage.getItem('roles') == 'ROLE_ADMIN') {
        next({ name: 'root' })
        return
    }
    else if (localStorage.getItem('roles') == 'ROLE_USER') {
        next({ name: 'userDashboard' })
        return
    }
    else if (localStorage.getItem('roles') == 'ROLE_MODERATOR') {
        next({ name: 'techDashboard' })
        return
    }
    next({ name: 'login' })
}

