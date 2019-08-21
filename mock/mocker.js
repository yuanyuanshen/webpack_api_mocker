const proxy = {
    'GET /api/user': { id: 1, username: 'kenny', sex: 60 },
    'GET /api/user/list': [
        { id: 1, username: 'kenny', sex: 6 },
        { id: 2, username: 'kenny', sex: 6 }
    ],
    'GET /api/common/list': [
        { id: 1, console: '光远接口啥时候好' },
        { id: 2, console: '光远接口好了么' },
        { id: 2, console: '赛迪工单能通' },
        { id: 2, console: '赛迪工单能调么' }
    ],
    'POST /api/login/account': (req, res) => {
        const { password, username } = req.body
        if (password === '888888' && username === 'admin') {
            return res.send({
                status: 'ok',
                code: 0,
                token: 'sdfsdfsdfdsf',
                data: { id: 1, username: 'kenny', sex: 6 }
            })
        } else {
            return res.send({ status: 'error', code: 403 })
        }
    },
    'DELETE /api/user/:id': (req, res) => {
        console.log('---->', req.body)
        console.log('---->', req.params.id)
        res.send({ status: 'ok', message: '删除成功！' })
    }
}
module.exports = proxy
