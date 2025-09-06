
import React, { useState } from 'react';

const faqData = [
  {
    question: "What is Stylook?",
    pertanyaan: "Apa itu Stylook?",
    answer: "Stylook is a powerful visual content generator that uses Google's Gemini AI. It's designed for marketers, e-commerce owners, and creators to generate high-quality lookbooks and product B-rolls in seconds, helping to elevate affiliate and marketing campaigns.",
    jawaban: "Stylook adalah generator konten visual canggih yang menggunakan AI Gemini dari Google. Ini dirancang untuk para pemasar, pemilik e-commerce, dan kreator untuk menghasilkan lookbook dan B-roll produk berkualitas tinggi dalam hitungan detik, membantu meningkatkan kampanye afiliasi dan pemasaran."
  },
  {
    question: "Do I need to install anything?",
    pertanyaan: "Apakah saya perlu menginstal sesuatu?",
    answer: "No, Stylook runs directly in your browser within the Google AI Studio environment. There's nothing to download or install.",
    jawaban: "Tidak, Stylook berjalan langsung di browser Anda dalam lingkungan Google AI Studio. Tidak ada yang perlu diunduh atau diinstal."
  },
  {
    question: "Is it mobile-friendly?",
    pertanyaan: "Apakah ini ramah seluler?",
    answer: "The Google AI Studio environment, where this app runs, is best experienced on a desktop computer. For full functionality and the best user experience, we strongly recommend using a desktop browser.",
    jawaban: "Lingkungan Google AI Studio, tempat aplikasi ini berjalan, paling baik dinikmati di komputer desktop. Untuk fungsionalitas penuh dan pengalaman pengguna terbaik, kami sangat menyarankan penggunaan browser desktop."
  },
  {
    question: "Is Stylook free to use?",
    pertanyaan: "Apakah Stylook gratis untuk digunakan?",
    answer: "Absolutely. Within the Google AI Studio environment, this application is completely free to use for exploration and experimentation. You can generate content without needing an API key or a billing account.",
    jawaban: "Tentu saja. Di dalam lingkungan Google AI Studio, aplikasi ini sepenuhnya gratis untuk digunakan untuk eksplorasi dan eksperimen. Anda dapat menghasilkan konten tanpa memerlukan kunci API atau akun penagihan."
  },
  {
    question: "Where is my data stored?",
    pertanyaan: "Di mana data saya disimpan?",
    answer: "Your data is not stored permanently. As highlighted in the disclaimer, you are in a temporary session. Uploaded images are processed by the Gemini API, and all generated results will be lost if you refresh or close the browser tab.",
    jawaban: "Data Anda tidak disimpan secara permanen. Seperti yang disorot dalam disclaimer, Anda berada dalam sesi sementara. Gambar yang diunggah diproses oleh Gemini API, dan semua hasil yang dibuat akan hilang jika Anda me-refresh atau menutup tab browser."
  },
];

const FaqItem: React.FC<{ item: typeof faqData[0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b-2 border-gray-700 last:border-b-0">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-6 text-lg font-semibold text-white focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="flex flex-col">
          <span>{item.question}</span>
          <em className="text-base font-medium text-gray-400/80 -mt-1">{item.pertanyaan}</em>
        </span>
        <svg
          className={`w-6 h-6 transform transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-gray-300 space-y-2">
            <p>{item.answer}</p>
            <p className="italic text-sm text-gray-400">{item.jawaban}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mt-16 md:mt-24">
      <div className="w-full">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Frequently Asked Questions
        </h2>
         <h3 className="text-xl font-semibold text-center text-gray-500 mb-8">
          Pertanyaan yang Sering Diajukan
        </h3>
        <div className="bg-gray-900 rounded-xl border-2 border-gray-900 shadow-[8px_8px_0px_#e5e7eb]">
          {faqData.map((item, index) => (
            <FaqItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
