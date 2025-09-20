import { memo, useState, type FormEvent } from "react";
import { usePhone } from "../../api/hooks/usePhone";
import { Button, Input, Radio } from "antd";
const Phones = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(
    "https://pub-7be1d45c4a744f86846c80e90df909eb.r2.dev/files/36bc02b0-6e32-428c-860f-c775eb5aa3d4.png"
  );
  const [memory, setMemory] = useState<string>("");
  const [hasDelivery, setHasDelivery] = useState(true);
  const [memories, setMemories] = useState<string[]>([]);
  const { getPhone, createPhone, deletePhone } = usePhone();
  const { data, isLoading } = getPhone();

  const handleDelete = (id: string) => {
    deletePhone.mutate(id);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = { title, price: Number(price), image, memories, hasDelivery };
    createPhone.mutate(phone);
    setTitle("");
    setPrice("");
    setMemory("");
  };
  const handleAddMemory = () => {
    const exist = memories.includes(memory);

    if (memory.trim() && !exist) {
      setMemories((prev) => [...prev, memory]);
      setMemory("");
    } else {
      setMemory("");
    }
  };

  const handleRemoveMemory = (inx: number) => {
    setMemories((prev) => prev.filter((_, index) => index !== inx));
  };

  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] shadow-lg p-10 mx-auto flex flex-col gap-5 mt-15"
        action=""
      >
        <Input
          placeholder="Enter the title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
        ></Input>
        <Input
          placeholder="Enter the price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          type="number"
        ></Input>

        <Input
          placeholder="Enter the image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        ></Input>

        <div className="mb-[-20px] flex gap-1">
          <Input
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
            className="w-full"
            type="text"
            placeholder="Enter the memory"
          ></Input>
          <button
            onClick={handleAddMemory}
            type="button"
            className="bg-blue-500 text-white px-3 rounded-lg text-xl"
          >
            &#10011;
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {memories.map((item, idx) => (
            <div
              className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
              key={idx}
            >
              <span>{item}</span>
              <span
                className="cursor-pointer"
                onClick={() => handleRemoveMemory(idx)}
              >
                &#10005;
              </span>
            </div>
          ))}
        </div>

        <b className="text-blue-500">Does this product have delivery?</b>
        <Radio.Group
          onChange={(e) => setHasDelivery(e.target.value)}
          value={hasDelivery}
          className="mt-5"
        >
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
        <Button htmlType="submit" className="w-full" type="primary">
          submit
        </Button>
      </form>
      <div className="flex flex-wrap justify-center gap-10 justify-self-center mt-20">
        {data?.map((item: any) => (
          <div
            className="w-[300px] text-center shadow-lg p-5 shadow-blue-200"
            key={item.id}
          >
            <b className="text-blue-500">Card {item.id}</b>
            <img className="mt-5" src={item.image} alt="" />
            <span>
              <b className="text-blue-500">Title: </b>
              {item.title}
            </span>{" "}
            <br />
            <span>
              <b className="text-blue-500">Price: </b> {item.price}
            </span>
            <br />
            <div>
              <b className="text-blue-500">Memory: </b>{" "}
              {item.memories.map((i: string, idx: number) => (
                <div
                  className="px-3 py-1  rounded-full text-sm flex justify-center leading-1.5"
                  key={idx}
                >
                  <span>{i}</span>
                </div>
              ))}
            </div>
            <div>
              <b className="text-blue-500">Includes delivery?</b>
              <span>{ item.hasDelivery ? " Yes" : " No"}</span>
            </div>
            <div className="flex justify-center gap-5 mt-3">
              <Button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                delete
              </Button>
              <Button>update</Button>
            </div>
          </div>
        ))}
      </div>
      {isLoading && <h1>Loading...</h1>}
    </div>
  );
};

export default memo(Phones);
