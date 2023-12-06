import React, { useEffect,useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from "react-redux";
import setup from "./config/setup";
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  setup.dispatch = useDispatch();
  const data_store = useSelector((state) => state[setup.prefix])[setup.prefix]
  const { get_blogs, set_data, update_data, check_unique_url } = setup.actions;

  const short_description_ref = useRef(null);
  const description_ref = useRef(null);
  const short_description_reflog = () => {
    if (short_description_ref.current) {
      console.log(short_description_ref.current.getContent());
    }
  };


  useEffect(() => {
    get_blogs(id);

    return () => {
      document.getElementById('form-data')?.reset();
      set_data(null)
    };
  }, []);

  // console.log(data_store);

  const handleSubmit = async () => {
    let e = event;
    e.preventDefault();
    let form_data = new FormData(e.target);
    form_data.append('id', id);
    form_data.append("short_description", short_description_ref.current.getContent());
    form_data.append("description", description_ref.current.getContent());

    [...document.querySelectorAll('.form_error')].forEach((el => el.remove()));

    console.log(short_description_ref.current.getContent());
    await update_data(form_data);
    // e.target.reset();
    // // e.target.serial.value = "";
    // // e.target.title.value = "";

  };

  const handleChange = async (e) => {
    let url = e.target.value;
    await check_unique_url({url, id});
    console.log('Input value changed:', url);
  }

  if (data_store) {
    const { subtitle, title,url, short_description, description, photo, photo_alt_text, seo_title, seo_keyword, seo_description, seo_schema_tags, published_date , isUrlExist} = data_store;
    let a = new Date(published_date).toISOString().substring(0, 10)
    console.log('isurl', isUrlExist);
    return (
      <div className="card list_card">
        <div className="card-header ">
          <h2 className="heading">Edit</h2>
          <div className="btns d-flex gap-2 align-items-center">
            <a href="#/blog" className="btn rounded-pill btn-outline-secondary">
              <i className="material-symbols-outlined fill">arrow_back</i>
              Back
            </a>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="container py-5">
              <div className="row">
                <div className="col-lg-8">
                  <div className="form-group mb-5">
                    <div className="custom_form_el">
                      <label htmlFor="">Title</label>
                      <div>:</div>
                      <div><input name="title" type="text" className="form-control" defaultValue={title} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">URL</label>
                      <div>:</div>
                      <div><input name="url" 
                      type="text"
                       className="form-control" 
                       defaultValue={url} 
                       onChange={(e) =>handleChange(e)}
                       />
                       {
                        isUrlExist?

                        <div className="text-warning">
                          This is url is exist
                        </div>
                        :
                        ""
                      }
                       </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Subtitle</label>
                      <div>:</div>
                      <div><input name="subtitle" type="text" className="form-control" defaultValue={subtitle} /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Short Description</label>
                      <div>:</div>
                      <div>
                      <Editor
                        onInit={(evt, editor) => short_description_ref.current = editor}
                        // initialValue= {short_description ? short_description :'no data'}
                        initialValue= {short_description ? short_description :'no data'}
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                        </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Description</label>
                      <div>:</div>
                      <div>
                      <Editor
                        onInit={(evt, editor) =>description_ref.current = editor}
                        initialValue="<p>This is short description.</p>"
                        init={{
                          height: 300,
                          menubar: false,
                          plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                          ],
                          toolbar: 'undo redo | formatselect | ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                        </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Published Date</label>
                      <div>:</div>
                      <div><input name="published_date" type="date" className="form-control" defaultValue={published_date} /></div>
                    </div>
                    
                    <div className="custom_form_el">
                      <label htmlFor="">Photo</label>
                      <div>:</div>
                      <div><input name="photo" type="file" accept="image/*" className="form-control" /></div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Photo Alt Text</label>
                      <div>:</div>
                      <div><input name="photo_alt_text" type="text" className="form-control" defaultValue={photo_alt_text} /></div>
                    </div>
                    <div className="mt-4 mb-3">
                      <h4>SEO Part <sub>optional</sub></h4>
                      <hr />
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Seo Title</label>
                      <div>:</div>
                      <div>
                        <textarea name="seo_title" className="form-control" id="">{seo_title}</textarea>
                      </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Seo Keyword</label>
                      <div>:</div>
                      <div>
                        <textarea name="seo_keyword" className="form-control" id="">{seo_keyword}</textarea>
                      </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Seo Description</label>
                      <div>:</div>
                      <div>
                        <textarea name="seo_description" className="form-control" id="">{seo_description}</textarea>
                      </div>
                    </div>
                    <div className="custom_form_el">
                      <label htmlFor="">Seo Schema Tags</label>
                      <div>:</div>
                      <div>
                        <textarea name="seo_schema_tags" className="form-control" id="">{seo_schema_tags}</textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
          <button className="btn btn-outline-info" type="submit" value="Create">
            Submit{" "}
          </button>

          </div>
        </form>
      </div>
    )
  }
}

export default Edit