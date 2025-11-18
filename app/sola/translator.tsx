"use client";

import { useState } from "react";

interface Props {
  text: string;
  onTranslated: (value: string) => void;
}

export default function Translator({ text, onTranslated }: Props) {
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!text.trim()) return;

    setLoading(true);

    const res = await fetch("/api/sola/translate", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    onTranslated(data.translation);

    setLoading(false);
  };

  return (
    <button
      onClick={translate}
      disabled={loading}
      className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition"
    >
      {loading ? "Translating..." : "Translate"}
    </button>
  );
}
