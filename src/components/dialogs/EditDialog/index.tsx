import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { BoltIcon } from "lucide-react";

interface IProps {
  title: string;
  children: React.ReactNode[] | undefined;
}

const EditDialog: React.FC<IProps> = ({ title, children }) => {
  return (
    <Dialog>
      <DialogTrigger>
        <button type="button" className="relativ">
          <BoltIcon size={18} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex justify-between">
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Name</p>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Username</p>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => {}}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
