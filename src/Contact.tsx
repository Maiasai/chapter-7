import React from 'react';
import { useState } from 'react';


type FormData = {
  name: string;
  email: string;
  message: string;
}


type NewErrors = {
  name?: string;
  email?: string;
  message?: string;

}

export const Contact = () => {
  const [text, setText] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState<NewErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleForm = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;

    //ここの処理でvalue={text.name} などの入力欄の値が更新されて表示される
    setText(prev => ({
      ...prev,
      [name]: value
    }));

    // 入力した項目のエラーはリセットする
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  //クリア押した時に入力欄を空にするコード
  const handleClear = () => {
    setText({name: '',email: '',message: ''});
  };




  //バリデ
  const validateForm  = (text : FormData ):NewErrors => {
    const newErrors: NewErrors = {};

    if (!text.name?.trim()) {
      newErrors.name = 'お名前は必須です';

    } else if (text.name.length > 30) {
      newErrors.name = 'お名前は30文字以内で入力してください';
    }

    if (!text.email.trim()) {
      newErrors.email = 'メールアドレスは必須です';

    } else if (!/\S+@\S+\.\S+/.test(text.email)) {
      newErrors.email = '正しいメールアドレスを入力してください';
    }

    if (!text.message.trim()) {
      newErrors.message = '本文は必須です';

    } else if (text.message.length > 500) {
      newErrors.message = '本文は500文字以内で入力してください';
    }

    return newErrors;

  };

  
  const handleSubmit = async (e:React.FormEvent< HTMLFormElement >):Promise<void> => {
    e.preventDefault();  //ページリロード防止
    setIsLoading(true);  //ボタンを無効化したりローディング表示

    const isValid : NewErrors = validateForm(text); //validateFormでtextの内容をチェック＞エラーがあれば Errors オブジェクトを返す

    //もしもエラ＝があるなら、setErrosに渡してReactの状態にセット、ここでエラー表示をする。
    if (Object.keys(isValid).length > 0) {
      setErrors(isValid); // ← 必ずここでまとめてセット
      setIsLoading(false);//送信中処理
      return;
    }

    //エラーなければ下記でfetchAPIで送信処理
    if (!isValid) return;
      try {
        const responce = await fetch(
          "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(text), //入力したデータjsonにして送る
          }
        );

        // 成功時の処理
        //フォーム初期化してもOK
        alert("送信しました");   
        handleClear(); // 成功時のみクリア
    
      } catch(err) {

        alert("送信に失敗しました");

      } finally {
        setIsLoading(false); // ローディング解除。成功・失敗関係なく再び有効にする
      }
  };

  return (
    <div className='px-4 my-10 max-w-3xl mx-auto font-light'>
      <h1 className='mb-10 font-black text-xl'>問い合わせフォーム</h1>

      <form onSubmit={handleSubmit}>
        <ul>
          <div className='flex justify-between mb-6 h-[58px] items-center'>
            <p className='w-1/4'>お名前</p>

            <div className='w-3/4'>
              <input
                className='border border-gray-300 rounded-lg h-[58px] w-full p-4'
                type="text"
                name="name"
                disabled={isLoading}
                value={text.name}
                onChange={handleForm}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          <div className='flex justify-between mb-6 h-[58px] items-center'>
            <p className='w-1/4'>メールアドレス</p>

            <div className='w-3/4'>
              <input
                className='border border-gray-300 rounded-lg w-full p-4'
                type="text"
                name="email"
                disabled={isLoading}
                value={text.email}
                onChange={handleForm}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className='flex justify-between mb-6 h-[226px] items-center'>
            <p className='w-1/4'>本文</p>

            <div className='w-3/4 h-[226px]'>
              <textarea
                className='border border-gray-300 rounded-lg w-full h-full p-4'
                name="message"
                disabled={isLoading}
                value={text.message}
                onChange={handleForm}
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>
          </div>
        </ul>

        <div className='flex justify-center h-10'>
          <button
            className='w-[64px] h-full border mr-4 mt-8 py-2 px-4 rounded-lg bg-black text-white whitespace-nowrap'
            type="submit"
            disabled={isLoading}
          >
            送信
          </button>

          <input
            className='w-[80px] h-full mt-8 rounded-lg bg-gray-200 text-black'
            type="reset"
            value="クリア"
            onClick={handleClear}
          />
        </div>
      </form>
    </div>
  );
};