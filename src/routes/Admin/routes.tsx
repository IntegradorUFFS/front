import DashboardPage from "@/pages/Admin/Dashboard";
import PesquisaIAPage from "@/pages/Admin/Modules/Analise/PesquisaIA";
import RelatoriosPage from "@/pages/Admin/Modules/Analise/Relatorios";
import CondutoresPage from "@/pages/Admin/Modules/Gestao/Condutores";
import FrotasPage from "@/pages/Admin/Modules/Gestao/Frotas";
import MultasPage from "@/pages/Admin/Modules/Infracoes/Multas";
import PipelinePage from "@/pages/Admin/Modules/Infracoes/Pipeline";
import RecursosPage from "@/pages/Admin/Modules/Infracoes/Recursos";
import PlanoPage from "@/pages/Admin/Modules/MinhaConta/Plano";
import PagamentoPage from "@/pages/Admin/Modules/MinhaConta/Pagamento";

import {
  Inbox,
  House,
  Funnel,
  Clipboard,
  Truck,
  Users,
  ChartLine,
  CreditCard,
  Gift,
} from "lucide-react";

export interface IDirect {
  type: "direct";
  icon: React.ReactElement;
  href: string;
  text: string;
  className?: string;
  element: React.ReactNode;
  disabled?: boolean;
}

interface IGroup {
  type: "group";
  text: string;
  baseUrl: string;
  items: IDirect[];
  disabled?: boolean;
}

export type IData = IDirect | IGroup;

const itemsData: IData[] = [
  {
    icon: <House />,
    href: "/dashboard",
    text: "Visão Geral",
    type: "direct",
    element: <DashboardPage />,
  },
  {
    type: "group",
    text: "infrações",
    baseUrl: "/infracoes",
    items: [
      {
        icon: <Funnel />,
        href: "/pipeline",
        text: "Pipeline",
        type: "direct",
        element: <PipelinePage />,
      },
      {
        icon: <Inbox />,
        href: "/multas",
        text: "Multas",
        type: "direct",
        element: <MultasPage />,
      },
      {
        icon: <Clipboard />,
        href: "/recursos",
        text: "Recursos",
        type: "direct",
        element: <RecursosPage />,
      },
    ],
  },
  {
    type: "group",
    text: "gestão",
    baseUrl: "/gestao",
    items: [
      {
        icon: <Truck />,
        href: "/frotas",
        text: "Frotas",
        type: "direct",
        element: <FrotasPage />,
      },
      {
        icon: <Users />,
        href: "/condutores",
        text: "Condutores",
        type: "direct",
        element: <CondutoresPage />,
      },
    ],
  },
  {
    type: "group",
    text: "Análise",
    baseUrl: "/analise",
    items: [
      {
        icon: <ChartLine />,
        href: "/relatorios",
        text: "Relatórios",
        type: "direct",
        element: <RelatoriosPage />,
        disabled: true,
      },
      {
        icon: (
          <img src="/assets/ix_ai.svg" alt="AI icon" width={24} height={24} />
        ),
        href: "/pesquisa-ia",
        text: "Pesquisa com AI",
        type: "direct",
        element: <PesquisaIAPage />,
        className:
          "text-transparent bg-clip-text bg-gradient-to-tr from-blue-800 to-purple-950",
      },
    ],
  },
  {
    type: "group",
    text: "minha conta",
    baseUrl: "/minha-conta",
    disabled: true,
    items: [
      {
        icon: <CreditCard />,
        href: "/pagamento",
        text: "Dados de Pagamento",
        type: "direct",
        element: <PagamentoPage />,
      },
      {
        icon: <Gift />,
        href: "/plano",
        text: "Meu Plano",
        type: "direct",
        element: <PlanoPage />,
      },
    ],
  },
];

export default itemsData;
