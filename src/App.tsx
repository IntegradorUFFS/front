import React from "react";
import UserMenu from "components/UserMenu";
import FiltersLine from "components/FiltersLine";
import RippleButton from "components/RippleButton";
import { BrickWall } from "lucide-react";

const App: React.FC = () => {
  return (
    <div className="flex flex-1 flex-row ">
      <aside className="bg-zinc-200 min-w-60 max-w-72 w-full h-screen py-4 px-2">
        <UserMenu
          first_name="Conta"
          last_name="Teste"
          email="tetse@gmail.com"
        />
        <RippleButton
          onClick={console.log}
          text="Material"
          icon={<BrickWall />}
          active
        />
      </aside>
      <main className="flex-1 p-6">
        <FiltersLine possibleFilters={[]} />
      </main>
    </div>
  );
};

export default App;
