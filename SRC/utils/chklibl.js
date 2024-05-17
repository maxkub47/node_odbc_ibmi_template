const getlibl = ({ user }) => {
    if (user === 'MAX') {
        libl = 'MAXLIB1, MAXLIB, MAXTOOL'
    } else (
        libl = 'MAXLIB2, MAXLIB, MAXTOOL'
    )
    return libl
}

module.exports = {
    getlibl
}