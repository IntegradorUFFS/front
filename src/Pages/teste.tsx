import React from "react";
import Radio from "@/components/Radio";

const Teste: React.FC = () => {
  return (
    <div className="ml-10">
      <Radio
        label="teste"
        items={[
          { label: "oi", value: "oi" },
          { label: "oi2", value: "oi2" },
          { label: "oi3", value: "oi3" },
        ]}
        name="teste"
      />
    </div>
  );
};

export default Teste;
