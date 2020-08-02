const OrderIndex = ({ orders }) => {
  return (
    <div>
    <h1>Orders</h1>
    <br />
    <ul>
      {orders.map((order) => {
        return (
            <li key={order.id}>
              {order.ticket.title}
            </li>
        );
      })}
    </ul>
    </div>
  );
};

OrderIndex.getInitialProps = async (_, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;