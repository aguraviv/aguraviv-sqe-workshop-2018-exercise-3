import $ from 'jquery';
import * as flow_chart from 'flowchart.js';

import {parseCode, codeSoFar, returnCode} from './code-analyzer';

var array_of_lines = [];
var string_to_return = [];// for the switch case compexity

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let input_vactor = $('#input_vector').val();
        parseCode(codeToParse,input_vactor);//builds the new string to be added and sends it to the table
        var string_to_insert;
        var to_insert = update_string_to_insert(string_to_insert);
        
        call_the_flowchart();
        $('#table_data').html(to_insert); });
        
});


const eval_if_insert_to_array_of_line = (codeSoFar) =>{
    if(codeSoFar.is_it_statement === false && (codeSoFar.line.includes('{')===true||codeSoFar.line.includes('}')===true|| codeSoFar.line.includes('else'))===true ){
        return false;
    }
    return check_that_input_has_letters(codeSoFar.line);
};


const check_that_input_has_letters = (input_string) =>{
    var boolean_to_return = false;
    var char_to_check;
    for(var index_of_string = 0; index_of_string< input_string.length&& boolean_to_return===false; index_of_string++){
        char_to_check = input_string.charAt(index_of_string);
        if(char_to_check>='a' && char_to_check<= 'z' ){
            boolean_to_return = true;
        }
    }
    return boolean_to_return;
};


const update_helper_string = (do_we_add, coded) => {
    var insert_to_table;
    if(do_we_add === true&&coded.is_it_statement === true){
        array_of_lines.push({line: coded.line, Number:coded.Number, is_it_statement: coded.is_it_statement, color: coded.color });
        switch(coded.color){
        case 2 : insert_to_table = '<span style="color: Green; ">' + coded.line + '</span><br>'; break;
        default : insert_to_table =the_string_to_add(coded.line); 
        }
    }

    return insert_to_table;
    
};


const update_string_to_insert = (string_to_insert) => {
    var insert_to_table;
    for(var j=0; j<codeSoFar.length; j++ ){
        var do_we_add = eval_if_insert_to_array_of_line(codeSoFar[j]);
        insert_to_table = update_helper_string(do_we_add,codeSoFar[j] );
        if(do_we_add === true&&codeSoFar[j].is_it_statement === false)
        {  array_of_lines.push({line: returnCode[j].line, Number:codeSoFar[j].Number, is_it_statement: codeSoFar[j].is_it_statement, color: codeSoFar[j].color});
            switch(codeSoFar[j].color){
            case 2 : insert_to_table = '<span style="color: Green; ">' + returnCode[j].line + '</span><br>'; break;
            default : insert_to_table = the_string_to_add(returnCode[j].line); 
            } }
        string_to_insert = string_to_insert + insert_to_table + ' '; }
    return string_to_insert;
};

const call_the_flowchart = () => {
    var new_x = create_the_graph();
    let y = flow_chart.parse(new_x);
    y.drawSVG('needtochange', set_the_greean_part());
};



const set_the_greean_part=()=>({
    'x': 15,
    'y': 0,
    'line-width': 4,
    'line-length': 50,
    'text-margin': 10,
    'font-size': 12,
    'font-color': 'black',
    'line-color': 'black',
    'element-color': 'black',
    'fill': 'white',
    'yes-text': 'True',
    'no-text': 'False',
    'flowstate' : {
        'future' : { 'fill' : 'green'},
        'regular' : {'fill' : 'white'}
    }
});

const create_the_graph =() => {
    var to_return = 'st=>start: Start' + '\n'; var operations_to_add = [];
    for(var index=0; index<array_of_lines.length; index++ ){
        switch_case_helper_for_complexity(index);
        to_return = to_return+ string_to_return[index].line+ '\n';
        operations_to_add.push({line:string_to_return[index].type }); }
    to_return = to_return + 'st->op0'+ '\n';
    for(var index1=0; index1<operations_to_add.length; index1++ ){
        var string_from_operations= operations_to_add[index1].line;
        if(string_from_operations.includes('cond') === true){
            to_return = to_return + operations_to_add[index1].line+  '(yes)->' +operations_to_add[index1+1].line + '\n';
            to_return = to_return + operations_to_add[index1].line+  '(no)->' +operations_to_add[index1+2].line + '\n';
            index1 = index1 +1;
        }
        else if(index1 + 1 < operations_to_add.length){
            to_return = to_return + operations_to_add[index1].line + '->' + operations_to_add[index1+1].line + '\n';
        }
    }
    return to_return;
};

const switch_case_helper_for_complexity = (index) => {
    var string_to_enter ;
    //console.log(array_of_lines[index].color);
    switch(array_of_lines[index].color){
    case 2 :  string_to_enter = 'cond'+index+ '=>condition: ' +array_of_lines[index].line+ '(' + codeSoFar[index].Number + ')'+' |future'+  '\n' ;
        var type_to_enter = 'cond' + index; 
        string_to_return.push({line: string_to_enter, type:type_to_enter}); break;
    case 3 :  string_to_enter = 'cond'+index+ '=>condition: ' +array_of_lines[index].line+ '(' + codeSoFar[index].Number + ')'+' |future'+ '\n' ;
        var type_to_enter1 = 'cond' + index; 
        string_to_return.push({line: string_to_enter, type:type_to_enter1}); break;
    case 4 : string_to_enter= 'op'+ index + '=>operation: ' + array_of_lines[index].line+ '(' + codeSoFar[index].Number + ')'+' |future'+ '\n' ;
        var type_to_enter_op1 = 'op' + index;  
        string_to_return.push({line:string_to_enter, type:type_to_enter_op1 }); break;
    case 5 : string_to_enter = 'cond'+index+ '=>condition: ' +array_of_lines[index].line+ '(' + codeSoFar[index].Number + ')'+' |regular'+  '\n' ;
        var type_to_enter2 = 'cond' + index; 
        string_to_return.push({line: string_to_enter, type:type_to_enter2}); break;
    default: string_to_enter= 'op'+ index + '=>operation: ' + array_of_lines[index].line+ '(' + codeSoFar[index].Number + ')'+'|regular' + '\n' ;
        var type_to_enter_op = 'op' + index;  
        string_to_return.push({line:string_to_enter, type:type_to_enter_op });
    } };


//adds the string to be added
const the_string_to_add = (the_new_line_to_string) => `<tr> <td> ${the_new_line_to_string} `;


export {array_of_lines, string_to_return};