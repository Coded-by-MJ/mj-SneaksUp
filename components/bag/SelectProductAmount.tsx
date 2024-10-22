import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectCartItemAmountProps = {
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(props: SelectCartItemAmountProps) {
  const { amount, setAmount } = props;

  return (
    <Select
      defaultValue={amount.toString()}
      onValueChange={(value) => setAmount(Number(value))}
      disabled={props.isLoading}
    >
      <SelectTrigger className={"w-[65px]"}>
        <SelectValue placeholder={amount} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: amount + 10 }, (_, index) => {
          const selectValue = (index + 1).toString();
          return (
            <SelectItem key={selectValue} value={selectValue}>
              {selectValue}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SelectProductAmount;
