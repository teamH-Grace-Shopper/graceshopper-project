import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, selectUser } from "../Slices/userSlice";

const UserAccount = () => {
  const user = useSelector(selectUser);
  const { userId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser(userId));
  }, []);

  console.log("user orderItems: ", user.orders);

  if (user.orders && user.orders.length) {
    user.orders.map((order) => {
      return order;
    });
  }

  return (
    <div>
      <h1> You are viewing {user.firstName}'s Account</h1>
      <div>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <p>Address: {user.address1}</p>
        {user.address2 ? <p>Address2: {user.address2}</p> : null}
        <p>City: {user.city}</p>
        <p>State: {user.state}</p>
        <p>Zip Code: {user.zipCode}</p>
      </div>

      <h2>Order History</h2>
      <div>
        {user.orders && user.orders.length ? (
          user.orders.map((order) => {
            return (
              <div
                key={order.orderNumber}
                style={{ border: "1px solid black" }}
              >
                <p>Order Number: {order.orderNumber}</p>
                {order.completeStatus ? (
                  <p>Order Date: {order.completeStatus}</p>
                ) : <p>Order Date: Current Cart</p>}
                <div>
                  Items in Order: {order.orderItems.length}
                </div>
                <p>Order Total: ${order.orderItems ? order.orderItems.reduce((total,currVal)=>{
                  console.log("al;ksdfhjldaksjhflkajsd_____", order)
                    return (
                        total + Number(currVal.product.price * currVal.product.cartQuantity)
                    )
                }, 0): "No"}</p>
              </div>
            );
          })
        ) : (
          <h4>...No Order History</h4>
        )}
      </div>
    </div>
  );
};

export default UserAccount;
