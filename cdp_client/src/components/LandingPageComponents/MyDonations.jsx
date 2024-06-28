import React from "react";

function MyDonations() {
  return (
    <>
      <div class="untree_co-section before-footer-section">
        <div class="container">
          <div class="row mb-5">
            <form class="col-md-12" method="post">
              <div class="site-blocks-table">
                <table class="table">
                  <thead>
                    <tr>
                      <th class="product-thumbnail">Image</th>
                      <th class="product-name">Donation</th>
                      <th class="product-price">Amount</th>
                      {/* <th class="product-total">Total</th> */}
                      {/* <th class="product-remove">Remove</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="product-thumbnail">
                        <img
                          src="img/kids1.jpg"
                          alt="Image"
                          class="img-fluid"
                        />
                      </td>
                      <td class="product-name">
                        <h2 class="h5 text-black">Donation  1</h2>
                      </td>
                      <td>$49.00</td>

                      {/* <td>$49.00</td> */}
                      {/* <td><a href="#" class="btn btn-black btn-sm">X</a></td> */}
                    </tr>

                    <tr>
                      <td class="product-thumbnail">
                        <img
                          src="img/kids2.jpg"
                          alt="Image"
                          class="img-fluid"
                        />
                      </td>
                      <td class="product-name">
                        <h2 class="h5 text-black">Donation  2</h2>
                      </td>
                      <td>$49.00</td>

                      {/* <td>$49.00</td> */}
                      {/* <td><a href="#" class="btn btn-black btn-sm">X</a></td> */}
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>

          <div class="row">
            <div class="col-md-6">
              <div class="row mb-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyDonations;
