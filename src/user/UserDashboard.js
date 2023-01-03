import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from 'moment'

const Dashboard = () => {
  // we initiate a state to hold the purchase history
  const [history, setHistory] = useState();

  const {
    // we do double destructure
    // console.log(auth);
    user: { _id, name, email, role },
    token,
  } = isAuthenticated();

  const init = (userId, token) => {
    getPurchaseHistory(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setHistory(data);
      }
    });
  };

  useEffect(() => {
    init(_id, token);
  }, []);

  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link to={`/profile/${_id}`}>Update Profile</Link>
          </li>
        </ul>
      </div>
    );
  };

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information.</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 1 ? "admin" : "registered user"}
          </li>
        </ul>
      </div>
    );
  };

  const purchaseHistory = (theHistory) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {JSON.stringify(history)}

            {/* {theHistory.map((hist) => {
              return (
                <div>
                  <hr />
                  {hist.products.map((prod, index) => {
                    return (
                      <div key={index}>
                        <h6>Product name: {prod.name}</h6>
                        <h6>Product price: ${prod.price}</h6>
                        <h6>
                          Purchased date: {moment(hist.createdAt).fromNow()}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              );
            })} */}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="Dashboard"
      description={`G'day ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
