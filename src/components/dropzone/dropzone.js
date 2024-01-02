import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import "./styles/style.css";
// import {removeBackgroundFromImageUrl } from 'remove.bg';
// import { createClient } from '@supabase/supabase-js';

import axios from 'axios';

const Dropzone = () => {
      const [selectedFileUrl, setSelectedFileUrl] = useState('');
      const [previewImg, setPreviewImg] = useState('');
      let fileName;

      const onDrop = useCallback(acceptedFiles => {
            const file = acceptedFiles[0];
            console.log(file);

            const fileUrl = URL.createObjectURL(file);
            setPreviewImg(fileUrl);
            console.log('URL arquivo = ' + fileUrl);

            setSelectedFileUrl(file);
      }, [])
      const { getRootProps, getInputProps } = useDropzone({ onDrop })

      const handleUpload = async () => {
            if (selectedFileUrl) {
                  const formData = new FormData();
                  formData.append('file', selectedFileUrl);
                  try {
                        const urlAPI = 'https://scarlet-octopus-hem.cyclic.app/upload/arquivo';
                        const response = await axios.post(urlAPI, formData);

                        // Handle a resposta da API, se necessário
                        console.log('Resposta da API:', response.data);
                        fileName = response.data.supabase.data.path
                        console.log('nome do arquivo', fileName);
                  } catch (error) {
                        // Handle erros de requisição, se necessário
                        console.error('Erro ao enviar arquivo:', error);
                  }
            }
      };

      const handleRemoveBackground = async () => {
            try {
                  // const supabaseURL = "https://agcfldqdkvhbvmhaxzlx.supabase.co";
                  // const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnY2ZsZHFka3ZoYnZtaGF4emx4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzk0MjU5NCwiZXhwIjoyMDE5NTE4NTk0fQ.tX-v_iJd5p1Pg9_QGM1q87lJMgiDijboAutkQRkgWXk";

                  // const apiKey = 'kEDXY16aK48wUPRRuNFcPBHz';

                  console.log("filename=", fileName);
                  const urlAPIGet = "https://scarlet-octopus-hem.cyclic.app/upload/create-url/" + fileName;
                  const resp = await axios.get(urlAPIGet);
                  const signedUrl = resp.data.data.signedUrl;
                  console.log("signedUrl", signedUrl);


                  // problema com a rota do lado no Nestjs CORS
                  // const formData = new FormData();
                  // formData.append('file', signedUrl);

                  const urlAPI = "https://scarlet-octopus-hem.cyclic.app/upload/remover-fundo/bg" + fileName;
                  const response = await axios.post(urlAPI);
                  console.log(response);

                  const urlBgImage = "https://scarlet-octopus-hem.cyclic.app/upload/create-url/" + response.data.data.path;
                  const resposta = await axios.get(urlBgImage);

                  // Abre uma nova guia com a imagem removida do fundo
                  window.open(resposta.data.data.signedUrl, '_blank');


            } catch (error) {
                  console.error('Erro ao remover o fundo:', error);
            }
      };


      return (
            <>
                  <div className='dropzone' {...getRootProps()}>
                        <input {...getInputProps()} />
                        {selectedFileUrl
                              ? <img src={previewImg} alt='Imagem sem remover o background' />
                              : <p>
                                    <FiUpload />
                                    Solte a imagem ou clique para selecionar
                              </p>
                        }

                  </div>
                  <button onClick={handleUpload}>Enviar</button>


                  <button className='btn-bg' onClick={handleRemoveBackground}>Remover background</button>

            </>
      )
}

export default Dropzone;