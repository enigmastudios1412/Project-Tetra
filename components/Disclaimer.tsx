
import React from 'react';

export const Disclaimer: React.FC = () => {
  return (
    <section className="mt-16 md:mt-24">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 shadow-[8px_8px_0px_#facc15]">
        <div className="flex items-start space-x-4">
          <div>
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-yellow-900 mb-2">
              A Quick Heads-Up!
              <span className="block text-lg font-semibold italic text-yellow-800/80 mt-1">Sekilas Info!</span>
            </h2>
            <p className="text-yellow-800 mb-4">
              You are currently using this application in a special development environment provided by <strong>Google AI Studio</strong>. Please keep the following in mind:
              <br/>
              <em className="text-sm text-yellow-700/90">Anda saat ini menggunakan aplikasi ini di lingkungan pengembangan khusus yang disediakan oleh <strong>Google AI Studio</strong>. Harap perhatikan hal-hal berikut:</em>
            </p>
            <ul className="list-disc list-inside space-y-3 text-yellow-800">
              <li>
                <strong className="font-semibold text-yellow-900">Requires Google Account:</strong> You must be logged into a Google account to run this app.
                 <p className="text-sm italic text-yellow-700/90 pl-1">
                  <strong>Memerlukan Akun Google:</strong> Anda harus masuk ke akun Google untuk menjalankan aplikasi ini.
                </p>
              </li>
              <li>
                <strong className="font-semibold text-yellow-900">No API Key Needed:</strong> This environment is pre-configured. You can explore and generate content freely without needing your own API key.
                <p className="text-sm italic text-yellow-700/90 pl-1">
                  <strong>Tidak Perlu Kunci API:</strong> Lingkungan ini sudah dikonfigurasi sebelumnya. Anda dapat menjelajahi dan menghasilkan konten dengan bebas tanpa memerlukan kunci API Anda sendiri.
                </p>
              </li>
              <li>
                <strong className="font-semibold text-yellow-900">Temporary Sessions:</strong> Your uploaded images and generated results are not saved. They will be lost if you close or refresh this browser tab.
                <p className="text-sm italic text-yellow-700/90 pl-1">
                  <strong>Sesi Bersifat Sementara:</strong> Gambar yang Anda unggah dan hasil yang dibuat tidak disimpan. Data akan hilang jika Anda menutup atau me-refresh tab browser ini.
                </p>
              </li>
              <li>
                <strong className="font-semibold text-yellow-900">For Exploration:</strong> This setup is perfect for trying out the app, learning from its code, and experimenting with its capabilities.
                 <p className="text-sm italic text-yellow-700/90 pl-1">
                  <strong>Untuk Eksplorasi:</strong> Pengaturan ini sangat cocok untuk mencoba aplikasi, belajar dari kodenya, dan bereksperimen dengan kemampuannya.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
