import React from "react";
import ProductForm from "./productForm";

const Section = () => {
  return (
    <section className="flex h-[85vh] ">
      <div className="flex md:w-[40vw] w-screen items-center justify-center">
        <div className="w-[70%] h-[85%] rounded-lg overflow-auto">
          <ProductForm />
        </div>
      </div>
      <div className="md:flex w-[60vw] pt-[15vh] hidden">
        <div>
          <h3 className="font-bold text-3xl max-w-[30vw]">
            Your One Stop shop for digital media
          </h3>
          <p className="text-lg max-w-[40vw]">
            Empower yourself by selling your product, accept payments globally
            and earn rewards. Get started
          </p>
        </div>
      </div>
    </section>
  );
};

export default Section;
