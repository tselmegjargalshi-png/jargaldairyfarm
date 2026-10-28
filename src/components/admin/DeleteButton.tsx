"use client";

export function DeleteButton({ action, label = "Устгах", confirmText = "Үнэхээр устгах уу? Энэ үйлдлийг буцаах боломжгүй." }: {
  action: () => Promise<void>;
  label?: string;
  confirmText?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className="rounded-full border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">
        {label}
      </button>
    </form>
  );
}
