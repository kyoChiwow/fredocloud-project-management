import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import ActionCard from "./actionCard";

export default function Column({ status, items }) {
  return (
    <div className="bg-gray-100 p-3 rounded-lg min-h-100">
      <h2 className="font-bold mb-3">{status}</h2>

      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <ActionCard key={item.id} item={item} />
        ))}
      </SortableContext>
    </div>
  );
}