import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectCartItemSizeProps = {
  size: number;
  setSize: (value: number) => Promise<void>;
  isLoading: boolean;
  productSizes: number[];
};

function SelectProductSize(props: SelectCartItemSizeProps) {
  const { size, setSize, productSizes } = props;

  return (
    <Select
      defaultValue={size.toString()}
      onValueChange={(value) => setSize(Number(value))}
      disabled={props.isLoading}
    >
      <SelectTrigger className={"w-[65px]"}>
        <SelectValue placeholder={size} />
      </SelectTrigger>
      <SelectContent>
        {productSizes.map((productSize) => {
          return (
            <SelectItem key={productSize} value={productSize.toString()}>
              {productSize.toString()}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}

export default SelectProductSize;
