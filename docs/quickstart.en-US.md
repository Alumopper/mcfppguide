---
title: QuickStart
order: -1
nav:
  title: QuickStart
  order: -1
---
Note that the mcfpp statement ends with a semicolon.

# Project Information File JSON Format
The project information file is located in the root directory of the project and serves as the entrance for the compiler during compiling. It contains all the information about the project.
```json
{
    //The files contained in the project. '*' and relative paths are allowed.
    //Use '*' to represent all files in a directory.
    "file":[
        "*"                           
        "D:/workspace/mcfpp/project/*"     
    ],
    //Target Minecraft version
    "version":"1.19.4",     
    //Projects referenced by current project            
    "include":[
        "D:/workspace/mcfpp/another_project.json"
    ],
    "targetPath":"./out",               //Output directory
    //The default namespace of the project. Optional. The default value is "default"
    "namespace":"mcfpp"
}
```

# Basic Syntax
## Variables
Declaration: `type identifier (= expr)?;`
For example: `int i = 5 + p;`，`int x,y,z;`
MCFPP supports operators including `+`,`-`,`*`,`/`,`%`,`&&`,`||`,`!`,`++`,`--`
Note that `++` and `--` can only be used as a statement instead of a part of an expression. That means, statement like `i++` is allowed while `i = i ++;` is illegal.

Here are basic types in MCFPP: 
|Type Name  |Description                                |Example|
|-----------|--------------                             |-----------|
|int        |The most Basic type, represents an integer  |`1`,`114514`,`-5`|
|double     |Represents a double-precision floating-point number |`2.5`,`1.0`,`9.5e6`|
|jstring    |Represents a raw json text |`"mcfpp"`,`{"text":"mcfpp","color":"#114514"}`|
|string     |Represents a string|`"mcfpp"`,`"qwq"`                             |
|entity     |Represents an entity|-                                            |
|selector   |Represents a target selector|`@a`,`@p[limit=6]`                            |

### Variable modifiers
Variable modifiers can be used to indicate the variable's properties, including `dynamic`, `const`,`import`
- dynamic
During compiling, if there is variable declared as literals, compiler will optimize the processing of this variable. For example, as for `int i = 5; i += 7;`, the compiler will record the variable `i` as `12`, instead of compile the statement to scoreboard commands. The `dynamic` keyword is used to tell the compiler that this variable should always be dynamic at runtime, even if it is a literals. For example, as for `dynamic int i = 5`, the compiler will compile the statement into a scoreboard command instead of record its value.
- const
`const` is used to indicate that a variable is a constant, which means its value is definite during compile and cannot be changed. For example, as for `const int i = 5;`, `i` will be considered as a constant during compiling. Constants are always compile-time static. The value of a constant must be determined when it is declared and cannot be assigned after declaration.
- import
`import` is used to indicated that a variable is an "import variable",  which means its value is import from other place (can be a lib, another function, ect.). Generally speaking, a variable should be assigned before using. However, an imported variable can be used without assigned. 

## Comments
```cpp
//single line comment

/*
* block comment
*/
```

## Logical Statement

- if
```cpp
if(bool){
    statement...
}else if(bool){
    statement...
}else{
    statement...
}
```
- while
```cpp
while(bool){
    statement...
}
```
- do-while
```cpp
do{
    statement...
}while(bool);
```
- for
```cpp
for(forinit;bool;forupdate){
    statement...
}
```
`break` and `continue` is available.

## Namespace
You can declare a namespace for a single file.
```cpp
//should declared at the top of the file
namespace xxx;
```
If the namespace is not explicitly declared in a file, the compiler will use the default namespace specified in the project configuration file.

## Function
```cpp
returnType identifier(type param...){
    statement...
}
```
The function's namespace is determined by the namespace of the file.
:::warning{title=Note!}
The function names in MCFPP can only contain letters, numbers and underscores.
:::
`return` is available.

### Annotation
The function annotation is optional. It can be used to provide additional information or metadata about the function. Annotations only exist during compiling.
```cpp
@tag("example:qwq")
@tick()
void test(){
    statement...
}
```
Annotation is started with `@`, followed by an identifier, and then a pair of parentheses. The parentheses enclose the parameter list for the annotation. The parameters should always be constant.
Here lists all annotation in MCFPP:
|Name|Parameter|Description|
|-----|----|----|
|tag|A namespace id|indicates a tag for the function|
|tick|(Optional)A non-zero integer that represents how often a function is executed, in terms of ticks. The default value is 1.| Indicates a function as a tick function|
|load|None|Indicates a function as a tick function|

### static parameter
Static parameter is a special parameter type used to return. The static keyword allows changes to a variable within a function to persist across multiple function calls. For example:
```cpp
void test(static int a,int b){
    a++;
    b++;
}

void main(){
    int a = 0;
    int b = 0;
    test(a,b);
}
```
The final values of `a` and `b` are `1` and `0`.

## Global Field <Badge type="info">Future Features</Badge>
The global scope refers to the scope outside of classes and functions, where only variables can be declared. The global scope is related to namespaces. Variables declared within the global scope can be accessed from anywhere within the namespace. The syntax for declaring variables in the global scope is:
```cpp
global {
    int i = 6;
}

```
Global field can only be declared once within a single namespace:
```cpp
namespace test;

global {
    int i = 5;  //Global variables
    float b = 9;
}

void main(){
    print(i);   //Use global variables
}
```

## Class
```cpp
class ClassName{
    classMember...
}
```
:::warning{title=Note!}
Class names in MCFPP must be started with an uppercase letter.
:::
### Access Modifiers
- public Can be access at anywhere.
- protect Can only be accessed by the class itself and its subclasses
- private (default)Can only be access by the class itself.

### Class Field
`accessModifier type identifier`
e.g. :`public int i;`
### Class Function
`accessModifier + a function declaration`
e.g. :`public void qwq(){}`

**`static` is available**

### Constructor
`accessModifier ClassName(params){body}`
### Inheritance
`ChildClass : ParentClass/ParentInterface`.
In MCFPP, a class can inherit from multiple classes or interfaces.
The `override`` keyword  can be used to override a method from a parent class or interface.
### Super & This
Call the constructor of a parent class: `super()`
Call its own constructor: `this()`
Access its own field : `this.xxx`
Access a static class member: `ClassName.xxx` or `ClassName.function()`
:::warning{title=Note!}
In MCFPP, `this` keyword or a ClassName is must to access a class member.
:::

Here is a complete example of class.
```cpp
class Student{
    static int id;

    int stuId;
    int score;

    public Student(int score){
        this.stuId = id;
        Student.id++;
        this.score = score;
    }

    public getScore(static int score){
        score = this.score;
    }
}
```
### Abstract Class & Abstract Function
Add `abstract` keyword can declare a class as an abstract class. An abstract class cannot be instantiated.
Add `abstract` keyword can declare a function as an abstract function. An abstract function cannot contain a function body.

### Extend Function
Extend function makes it able to "add" a function to existing classes without declaring a new subclass, recompiling or changing the original classes in other possible ways. Extend Function is declared outside the class, but it can be called like a normal member function of the class.
Extend function can only access public members in the class.
Use syntax like `ClassName.FunctionName` to declare an extend function. For example:
```cpp
namespace test;

void main(){
    Test t = Test();
    t.test1();      //call an extend function
    Test.test2();   //call a static extend function 
}

class Test{
    private int index = 0;
    public static int i = 0;

    public int index = 0;

    public Test(){
        this.index = Test.i;
        Test.i = Test.i + 1;
    }
}

//declare an extend function
void Test.test1(){
    print(this.index);
}

//declare a static extend function
static void Test.test2(){
    print(Test.i);
} 
```
## Interface
```cpp
interface InterfaceName{
    interfaceMember...
}
```
You can declare abstract function in an interface. An interface can derive from another function.

## Structure
Structure is a data structure composed entirely of scoreboard values. Therefore, a structure can only have scoreboard fields, which is used as `int`.
When declaring a field in a structure, it is possible to omit the field type `int`.
Except the field type, the structure is almost the same as the class.
Here is an example of a structure.
```cpp
struct FloatStruct{
    public static int index;
    public int member1;
    public member2;

    public FloatStruct(){
        member1 = index;
        index++;
    }

    public void print(){
        print(this);
    }
}
```
:::warning{title=Note!}
#### The difference between structure and class.
Although with similar syntax and functionality, classes and structures have fundamental differences in their implementation principles.

In terms of specific implementation, the implementation of a class is based on entities. An entity serves as an object of a class and stores various information about the class. If a variable `selector s = @s` is set in a class method, then `s` will point to the class entity itself. At the same time, the class entity also has a scoreboard value that simulates a heap address. Each instance has a unique scoreboard value as its address. The class pointer actually points to this scoreboard value to reference the entity, thus implementing class pointers.

On the other hand, the implementation of a structure is based on scoreboards. Structures are differentiated based on the naming of scoreboards. For example, if there is a structure `foo` under the namespace test with a member `mem`, then mcfpp will create a scoreboard named `struct_test_foo_mem`. Instances of this structure will record corresponding values on the scoreboard based on the variable names (identifiers in Minecraft). For example, `a` will correspond to the value `prefix_a` on the scoreboard. Additionally, structure variables are value types rather than reference types. Therefore, when assigning a value, the entire structure is copied, and attention should be paid to the size of the structure when passing it as a parameter.
:::


## MNI
Similar to JNI in Java, MNI is a programming framework, which enables compilers to invoke native codes written in Java **only during compiling**, thus achieving more flexible programming. MNI only exists in compiling process and cannot exist during the runtime.

### Native Function
Native function can be declared to invoke a specific Java Method during compiling.
Its declaration is like this:
```cpp
native test(params...) -> packagename.classname.funcname;  
```
The preceding part is a normal function declaration excluding the return type(native functions do not have a return type). The arrow points to the complete path of a Java method, including the package, class, and method name.
The arguments of the pointed Java function must be `(Var[] xxx, ClassBase cls)`. `Var[] xxx` contains the arguments passed in when this method is called, and `ClassBase cls` is the caller(may be null).
Here is an example, which is also a part of basic lib of MCFPP:
**System.java**
```js
package top.mcfpp.lang;

import org.jetbrains.annotations.NotNull;
import top.mcfpp.annotations.InsertCommand;
import top.mcfpp.lang.*;
import top.mcfpp.lib.Function;

public class System {
    
    //Native Function
    public static void print(@NotNull Var[] vars, ClassPointer cls) {
        //print() only needs one parameter.
        Var var = vars[0];
        if (var instanceof MCInt) print((MCInt) var);
        else if (var instanceof JsonString) print((JsonString) var);
        else print(var);
    }

    @InsertCommand
    public static void print(@NotNull MCInt var) {
        if (var.isConcrete()) {
            Function.Companion.addCommand("tellraw @a " + var.getValue());
        }else {
            Function.Companion.addCommand("tellraw @a " + new JsonTextNumber(var).toJson());
        }
    }

    @InsertCommand
    public static void print(JsonString var){
        Function.Companion.addCommand("tellraw @a " + var.getJsonText().toJson());
    }

    @InsertCommand
    public static void print(@NotNull Var var){
        Function.Companion.addCommand("tellraw @a " + "\"" +var + "\"");
    }

}

```

**sys.mcfpp**
```cpp
native print(int i) -> top.mcfpp.lang.System.print;
native print(bool b) -> top.mcfpp.lang.System.print;
```

**test.mcfpp**
```cpp
void main(){
    print(1);
    print(true);
}
```