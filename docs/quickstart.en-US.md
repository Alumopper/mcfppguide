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
在mcfpp中，要访问一个类的成员，必须使用this关键字或者使用类名进行访问。
:::

下面是一个完整的类的例子
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

### 抽象类和抽象函数
在类前添加`abstract`关键字可以将这个类声明为抽象类。抽象类不能被实例化。
在函数前添加`abstract`关键字可以将这个函数声明为抽象函数。抽象函数不能含有函数体。

### 扩展方法
扩展方法使你能够向现有类型“添加”方法，而无需创建新的派生类型、重新编译或以其他方式修改原始类型。扩展方法在类的外部声明，但是可以像类的成员方法一样调用。
使用`类名.方法名`的形式来声明扩展方法，例如：
```cpp
namespace test;

void main(){
    Test t = Test();
    t.test1();      //调用扩展方法
    Test.test2();   //调用静态扩展方法
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

//声明扩展方法
void Test.test1(){
    print(this.index);
}

//声明静态扩展方法
static void Test.test2(){
    print(Test.i);
} 
```
## 接口
```cpp
interface InterfaceName{
    interfaceMember...
}
```
你可以在接口中声明抽象函数。接口可以继承于其他接口。

## 结构体
结构体是一种完全由记分板构成的数据结构，因此结构体中只能有记分板变量，即`int`类型的变量作为成员。
在声明字段的时候，可以将字段类型`int`省略不写。
除此之外结构体和类几乎完全一致。
下面是一个结构体的例子：
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
#### 类和结构体的区别
虽然语法和功能基本一致，但是类和结构体在实现原理上有着本质的区别。

类是一个对象，而结构体是一个数据结构。

在具体的实现方面，类的实现方式是基于实体的，一个实体作为一个类的对象，实体上储存了类的各种信息，如果在类的方法中，设定了一个`selector s = @s`的变量，那么`s`将会指向类实体本身。同时，类的实体还会拥有一个记分板的值作为堆地址的模拟，每一个实例都有一个独一无二的记分板的值作为地址。而类的指针实际上指向的是这个记分板的值来指向这个实体，从而实现了类的指针。

而结构体的实现方式则是基于记分板的。结构体通过记分板的命名来区分“内存”区域。例如命名空间为test下的结构体foo，有成员mem，那么mcfpp就会创建一个名字为`struct_test_foo_mem`的记分板。这个结构体的实例则会根据实例变量的名字（在Minecraft中的标识符）来记分板上记录对应的值，例如`foo a`，在记分板上对应的值就是`前缀_a`。同时，结构体变量也是一种值类型的变量，而不是引用类型。因此在赋值的时候会把整个结构体进行一次复制，在参数传递的时候应当注意结构体的大小问题。
:::


## MNI
MNI类似于Java中的JNI，是一种编程框架，使得编译器在程序编译的过程中可以调用由**Java**代码编写的本地程序，从而实现更灵活的编写。MNI只存在于编译过程中，而不能存在于运行过程中。

### native函数
native可以被声明在类或者函数中，用于在**编译**阶段调用运行指定的一个java函数。
它的声明是这样的：
```cpp
native test(params...) -> packagename.classname.funcname;  
```
前面是一个普通的函数声明（但是不包括返回类型，也就是说native函数没有返回类型），箭头所指的则是java中的一个方法的完整路径，包括包，类和方法名。
相应的java函数的声明有一个要求，即函数的参数必须为`(Var[] xxx, ClassBase cls)`。`Var[] xxx`是调用这个函数时传入的参数的信息，`ClassBase cls`是这个函数所在的类的对象。如果这个函数不是一个类的成员，则`cls`参数将会是`null`
这是一个例子，也是是mcfpp基本库的一部分，即print函数的实现：

**System.java**
```js
package top.mcfpp.lang;

import org.jetbrains.annotations.NotNull;
import top.mcfpp.annotations.InsertCommand;
import top.mcfpp.lang.*;
import top.mcfpp.lib.Function;

public class System {
    
    //Native函数
    public static void print(@NotNull Var[] vars, ClassPointer cls) {
        //只会有一个参数哦
        Var var = vars[0];
        if (var instanceof MCInt) print((MCInt) var);
        else if (var instanceof JsonString) print((JsonString) var);
        else print(var);
    }

    @InsertCommand
    public static void print(@NotNull MCInt var) {
        if (var.isConcrete()) {
            //是确定的，直接输出数值
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