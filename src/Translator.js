import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  useLazyTranslate,
  getLanguages,
  setConfig
} from "react-google-translate";
import { Form, FormGroup, Label, Input, Col, Row, Jumbotron } from "reactstrap";
import { debounce } from "lodash";

setConfig({
  clientEmail: "test-971@test-translate-315810.iam.gserviceaccount.com",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7PfcPR2WxCXmx\n3ITwhV+aLnNVJo7++w6c8krFWHxYTB5saK6o9QBN5YlJjPRgSHbKFjTCkAS4xJnI\nlv7EHlavRVqqv+0EP1Z+sHt057DkGpP1DPxf1mK/H1aK3mQekaJwkW07/p5hswAI\nj1sPq6xYkErjUwXz+wezmDbaiGWzP3YAp1CNRQ36kyD2MWBqtYyvw+7rL7epeytc\ndI6eEexMaVEzUJXNGmq4QN18YD1nT3RZ6+yXHURehxcJFC0K6dV10KMELL2+6dt8\nGAgkbjinpcpzX9VO/cqDHoMFinFPTS4EGvP/Vxcd/xSwg/pbz1lgZs4Lx2vJls5E\nVUweteVdAgMBAAECggEAASRUYpy4G5CTtk3LAFxQq6Dlue8Q8xaTYMF9dYwEFfxe\nlsvVG2Qc2oMp3u2T45/VgtPVNXB86UixhzP+zoc4GuKSgv/XFKezXYYhT69TLdTz\ndp2kV4Oecsik3B8eDlyrgwZFF2x1jZU25mvMMeO4lmgEVsUB5s2zGpMS7AihwGpf\n1EhVny/yklRBL49fdCO+9h8a+s0BYHKUFWNTuOO8SYzXpJ8KxVb/w0P/W4cj8SEE\nK3vH58V+E20bX9mJVRsU/7/stHrZ5S65Jvzlxyc41Q0pcUliele90vuOE01Z13YP\nRhckre38FZvTAgAakwwJZb5tokbKEVY7cVhj0/4R8QKBgQDyii8ZRuD7SJANysIp\nWG4YKafqUai98PDZxfhcRIKMdqHRrgROsrP398Gan6row2uDuxKgA7nxBfZ+4NRQ\nZXCTVu39H8+iFVZxxSpdo+0wfvF4FoXexx/u/1cmFRxbDmxpyj9GAIuN70nsDFUt\nvrYtLn19GGaCPgjAWl8wDn+b8QKBgQDFoidx9qgfB4Y1i3kR9OmAtt+QYuxDwvdw\n8NfeOCGd7kU2cNfhnZ3ccpKnWiRssIOIn6Yj8dp+XYotoD3S3L162Wg+fW4mmqwV\nCwbshDKZtby0oMqy7dKreNFvacoL3pSm4UwN+2Fyv2HJQ8S0aaMcAKlKWbS/Z4QI\nZgyhPGs8LQKBgQC3R1zYCQuyV98jzPh0LfLkJ3ZQR2zwO8aFimhnsQ3F/0/BF3MB\n1WDSHVMb+VQ5mJMCdLdaW/aDADKJJnTKXB15+dLV2Ngab21ng8rEAEAYyZTHXp3C\n/05OWH4OtR08YeXi+4Zc68SJeS2vRpKHgvo/okYJ5gpwmVgboy8TLaGYwQKBgCIM\nlNUqlL570mCJPfudAVm+p/e9Q01NWsonhFlxvED0WxJNELR7LkZbqu6QNjRPmOnB\n76LDuUwKG5NOxzf79d0jdbVGcOLPxRP/CVtYT0tyJyfLiACZvrDyKMsUI841s9Co\ngizqgVh+pn9BYLNge8yIRKJdoClV0UaNJmHlAeilAoGBAIKHldvogvG2CmS1Geq/\nVSs3MgivAWMGb1yGAHTlcnhknQFrMnOZnMdnHpVVcBYzDdamnYtE0haQ1iLNzrIN\nAMw6ebxX5HRpkVa0w1D0xXk9NZMoXT05HqeaWax9Arvb/I1J4MSxyXL6hWN+GQgE\nUT0EnOyTIdDR4gdTsksysIkJ\n-----END PRIVATE KEY-----\n",
  projectId: "test-translate-315810"
});



const Translator = ({from,to,text}) => {
    console.log("mystring",text)
  const [language, setLanguage] = useState("ar");
  const [languageOptions, setLanguageOptions] = useState();
  const [mydata, setData] = useState('');
  console.log("language",language)

  const [translate, { called, data, loading }] = useLazyTranslate({
 
    language,
    
  });
 // console.log(data)
  //this.props.onChange(this.state.data)
  //if(text)
  const [searchedText, setSearchedText] = useState(text);
  if (!called) {
    translate(searchedText);
  }
   const debouncedSearch = debounce((value: string) => {
     setSearchedText(value);
  }, 500);


  
  useEffect(() => {
    translate(text, language);
    console.log("data",data)
    //handleOnChange()
  }, [text, translate, language]);
  useEffect(() => {
    getLanguages().then((res) => setLanguageOptions(res));
  }, []);
 

 


  return (
    <div>
   
        
          
                <Input
                  readOnly
                  value={
                    loading ? "Loading..." : data || "Please provide a text"
                  }
                 // onChange={(e) => debouncedSearch(e.target.value)}

                />
              <h3>data{data}</h3>
           
        
       
    
    </div>
  );
};

export default Translator;