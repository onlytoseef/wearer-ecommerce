import React from "react";
import del from "../../assets/images/AboutUs/del.svg";
import refund from "../../assets/images/AboutUs/refund.svg";
import customer from "../../assets/images/AboutUs/customer.svg";

export default function FeatCard() {
  return (
    <div className="flex mt-10 justify-center flex-col mb-[5rem] sm:flex-row sm:space-x-[10rem] space-y-[5rem] sm:space-y-0">
      {/* First Card */}
      <div className="flex-col text-center">
        <img className="m-auto" src={del} width={250} alt="Customer Support" />
        <h1 className="text-black text-[2rem] mt-10 font-secondary font-[500]">
          Free Delievery
        </h1>
        <p className="text-primary font-secondary">
          Order Now and get free delivery in all over Pakistan
        </p>
      </div>

      {/* Second Card */}
      <div className="flex-col text-center">
        <img className="m-auto" src={refund} width={238} alt="Easy Refund" />
        <h1 className="text-black text-[2rem] font-secondary font-[500]">
          Easy Exchange
        </h1>
        <p className="text-primary font-secondary">
          Customer can Exchange if find any Fault
        </p>
      </div>

      {/* Third Card */}
      <div className="flex-col text-center">
        <img
          className="m-auto"
          src={customer}
          width={200}
          alt="Customer Support"
        />
        <h1 className="text-black text-[2rem] font-secondary font-[500]">
          Customer Support
        </h1>
        <p className="text-primary font-secondary">
          We Provide Quality Stuff to our Customers
        </p>
      </div>
    </div>
  );
}
