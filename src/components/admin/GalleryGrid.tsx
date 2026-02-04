'use client'

/* eslint-disable @next/next/no-img-element */

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { GalleryImage } from '@/lib/database.types'

interface GalleryGridProps {
  images: GalleryImage[]
  onEdit: (image: GalleryImage) => void
  onDelete: (id: string) => void
  onReorder: (images: GalleryImage[]) => void
  isPending?: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  'frames': 'Frames',
  'sunglasses': 'Sunglasses',
  'contact-lenses': 'Contact Lenses',
  'store': 'Store',
}

export function GalleryGrid({
  images,
  onEdit,
  onDelete,
  onReorder,
  isPending = false
}: GalleryGridProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id)
      const newIndex = images.findIndex((img) => img.id === over.id)
      const newOrder = arrayMove(images, oldIndex, newIndex)
      onReorder(newOrder)
    }
  }

  const handleDelete = (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return
    onDelete(id)
  }

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-12 text-center">
        <svg
          className="w-12 h-12 text-neutral-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="text-neutral-600 mb-4">No gallery images yet</p>
        <p className="text-sm text-neutral-500">
          Add your first image using the button above
        </p>
      </div>
    )
  }

  return (
    <div className={isPending ? 'opacity-50 pointer-events-none' : ''}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={images} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <SortableItem
                key={image.id}
                image={image}
                onEdit={() => onEdit(image)}
                onDelete={() => handleDelete(image.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}

function SortableItem({
  image,
  onEdit,
  onDelete,
}: {
  image: GalleryImage
  onEdit: () => void
  onDelete: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden ${
        isDragging ? 'shadow-lg' : ''
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        <img
          src={image.image_url}
          alt={image.alt_text}
          className="w-full aspect-square object-cover"
        />
      </div>

      <div className="p-3">
        <p className="text-sm font-medium text-brand-black truncate">
          {image.alt_text}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
            {CATEGORY_LABELS[image.category] || image.category}
          </span>
          {image.brand && (
            <span className="text-xs text-neutral-500 truncate">
              {image.brand}
            </span>
          )}
        </div>
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={onEdit}
          className="p-1.5 bg-white/90 hover:bg-white rounded-full shadow-sm"
          title="Edit"
        >
          <svg
            className="w-4 h-4 text-neutral-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="p-1.5 bg-white/90 hover:bg-red-50 rounded-full shadow-sm"
          title="Delete"
        >
          <svg
            className="w-4 h-4 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
