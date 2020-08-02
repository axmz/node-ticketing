import { useEffect, useState } from "react"
import useRequest from '../../hooks/useRequest'
import StripeCheckoutButton from 'react-stripe-checkout'
import Router from "next/router"

const OrderShow = ({ order, currentUser }) => {
    console.log({ order })
    const [timeLeft, setTimeLeft] = useState("")
    const { doRequest, errors } = useRequest(
        {
            url: "/api/payments/",
            method: "post",
            body: {
                orderId: order.id
            },
            onSuccess: (payment) => {
                Router.push('/orders')
            }
        }
    )

    useEffect(() => {
        const timer = () => {
            const secondsLeft = Math.floor((new Date(order.expiresAt) - new Date()) / 1000)
            setTimeLeft(secondsLeft)
        }
        timer()
        const timerId = setInterval(timer, 1000)
        return () => clearInterval(timerId)
    }, [order])

    if (timeLeft < 0) {
        return <div>Order expired</div>
    }

    return (
        <div>
            <div>Time left to finish the order: {timeLeft} seconds</div>
            <div>
                {errors}
                <br />
                <div>Use fake card:</div>
                <div>4242 4242 4242 4242</div>
                <div>10/30 123</div>
                <br />
                <StripeCheckoutButton
                    email={currentUser.email}
                    token={({ id }) => doRequest({ token: id })}
                    amount={order.price * 100}
                    stripeKey={"pk_test_3wDszHw1C0WEcGBYiUVFwgFL00cR71OifV"}
                />
            </div>
        </div>
    )
}

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query
    const { data } = await client.get(`/api/orders/${orderId}`)

    return { order: data }
}

export default OrderShow
