"use client"

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Column from "./column";



export default function KanbanBoard({ items, onMove }) {
  const grouped = {
    TODO: items.filter(i => i.status === "TODO"),
    IN_PROGRESS: items.filter(i => i.status === "IN_PROGRESS"),
    DONE: items.filter(i => i.status === "DONE"),
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const newStatus = over.data.current?.status;

    if (!newStatus) return;

    await onMove(activeId, newStatus);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(grouped).map(([status, items]) => (
          <Column key={status} status={status} items={items} />
        ))}
      </div>
    </DndContext>
  );
}