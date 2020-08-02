const { default: Link } = require("next/link")
import Info from '../components/info'

const LandingPage = ({ currentUser, tickets }) => {
    const ticketList = tickets.map((t) => {
        return (
            <tr key={t.id}>
                <td>{t.title}</td>
                <td>{t.price}</td>
                <td><Link href={"/tickets/[ticketId]"} as={`/tickets/${t.id}`}><a>View</a></Link></td>
            </tr>
        )
    })
    return (<div>
        <h1>{currentUser ? 'Hi' : 'Pls login'}!</h1>
        <Info/>
        <br />
        <table className={"table"}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Link</th>
                </tr>
            </thead>
            <tbody>
                {ticketList}
            </tbody>
        </table>
    </div >)
}

LandingPage.getInitialProps = async (ctx, client, currentUser) => {
    const { data } = await client.get('/api/tickets')
    console.log({ data })

    return { tickets: data }
}

export default LandingPage