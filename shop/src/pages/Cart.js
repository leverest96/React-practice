import { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { changeCount } from "./../store.js";

function Cart() {
  let state = useSelector((state) => {
    return state;
  });

  let dispatch = useDispatch();

  return (
    <div>
      {state.user.name} {state.user.age}의 장바구니
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {state.product.map((a, i) => {
            return (
              <tr>
                <td>{a.id}</td>
                <td>{a.name}</td>
                <td>{a.count}</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(changeCount(a.id));
                    }}
                  >
                    +
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
