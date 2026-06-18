export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1B2A] flex flex-col items-center justify-center text-white p-4">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-2">📖</div>
        <h1 className="font-serif text-5xl md:text-6xl text-[#C9A84C] font-bold tracking-wide">
          IMORIA LEARNING
        </h1>
        <p className="text-[#CBD5E1] text-xl md:text-2xl font-light tracking-wider max-w-md mx-auto border-t border-[#C9A84C]/20 pt-4">
          Learn Smart. Rise Beyond.
        </p>
        <div className="pt-6">
          <span className="bg-[#1A2E42] border border-[#C9A84C]/30 text-[#E8C97A] px-6 py-3 rounded-full text-sm font-semibold shadow-md">
            BS English Semester-III • BZU Multan
          </span>
        </div>
      </div>
    </div>
  );
}
