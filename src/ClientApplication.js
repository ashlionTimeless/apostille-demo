const EthereumLib = require('./EthereumLib');
const ContractLib = require('./../core/contracts/ethereum/apostille/ContractLib');
const DateConverter = require('../core/helpers/DateConverter');
let Validator = require('../core/utilites/Validator');
let Logger = require('../core/utilites/Logger')

class ClientApplication{
    constructor(){
        this.initialized = false;
        this.logger = new Logger();
        this.validator = new Validator();
        this.dateConverter = new DateConverter();
        //new code
        this.protocols = {};
        this.eth = new EthereumLib(this);
        this.contract = new ContractLib(this);   
    }  

init(){
    return new Promise(async(resolve,reject)=>{
        try{
            await this.contract.init();
            this.initialized = true;
            console.log('Application is ready');
            return resolve(true);
        }catch(e){
            return reject(e)
        }
    })
}
isReady(){
    return this.initialized;
}
    addApostille(_hash,_tag,privKey){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.addApostille(_hash,_tag,privKey))
            }catch(e){
                return reject(e);
            }
        })
    }
    getAllApostilles(_owner){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.getAllApostilles(_owner))
            }catch(e){
                return reject(e);
            }
        })
    }
    verify(_hash,_owner){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.verify(_hash,_owner))
            }catch(e){
                return reject(e);
            }
        })
    }
    getApostille(_hash){
        return new Promise(async(resolve,reject)=>{
            try{
                return resolve(await this.contract.getApostille(_hash))
            }catch(e){
                return reject(e);
            }
        })
    }
}

module.exports = ClientApplication;