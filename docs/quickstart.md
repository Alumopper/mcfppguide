---
title: 快速开始
order: -1
nav:
  title: 快速开始
  order: -1
---
如果你有编程基础，那就直接看看 mcfpp 语法概要吧！
如果没有编程基础，那还是乖乖看后面的[详细教材](/perface)吧~
注意mcfpp语句是以分号结尾的。

# 工程信息文件JSON格式
工程信息文件置于工程根目录的位置，作为编译器编译的入口，包含了工程的所有信息。
```json
{
    //工程包含的文件。允许通配符*和相对路径
    //使用*表示目录下的所有文件
    "file":[
        "*"                           
        "D:/workspace/mcfpp/project/*"     
    ],
    //目标编译的mc版本
    "version":"1.19.4",                 
    //此工程引用到的其他工程
    "include":[
        "D:/workspace/mcfpp/another_project.json"
    ],
    "targetPath":"./out",               //编译后的输出目录
    //工程的默认命名空间。可选，默认为default
    "namespace":"mcfpp"
}
```

# 通用语法
## 变量

`type identifier (= expr)?;`
例如：`int i = 5 + p;`，`int i;`
mcfpp 支持的运算符有`+`,`-`,`*`,`/`,`%`(取余),`&&`,`||`,`!`,`++`,`--`
注意`++`和`--`只能单独作为一个语句，即只能`i++;`，而不能`i = i ++;`

mcfpp的基本数据类型有：
|类型名     |类型描述                   |例子                                          |
|-----------|--------------             |-----------                                  |
|int        |最基础的类型，表示一个整数  |`1`,`114514`,`-5`                             |
|double     |表示一个双精度浮点数        |`2.5`,`1.0`,`9.5e6`                           |
|jstring    |表示一个Json原始文本        |`"mcfpp"`,`{"text":"mcfpp","color":"#114514"}`|
|string     |表示一个字符串              |`"mcfpp"`,`"qwq"`                             |
|entity     |表示一个实体                |略                                            |
|selector   |表示一个目标选择器          |`@a`,`@p[limit=6]`                            |

## 注释
```cpp
//单行注释

/*
* 块注释
*/
```

## 逻辑语句

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
break和continue语句是可用的。

## 命名空间
每个文件的命名空间可以被单独声明
```cpp
namespace xxx;
```
若文件没有单独声明命名空间，则为工程配置文件设置的命名空间。

## 函数
```cpp
returnType identifier(type param...){
    statement...
}
```
函数的命名空间由文件的命名空间决定。若文件没有单独声明命名空间，则为工程配置文件设置的命名空间。
:::warning{title=Note!}
mcfpp中的函数必须只能包含小写字母和下划线，和mcfunction中的函数命名法则一样。
:::
return是可用的。

### 函数的注解
函数的注解是可选的，用于指定函数的一些特殊属性。
```cpp
@tag("example:qwq")
@tick()
void test(){
    statement...
}
```
注解由一个`@`符号开始，后面跟着一个标识符，然后是一对括号，括号中是注解的参数列表。注解中的参数只能为常量，不能为变量。
下面列出了mcfpp中的所有注解：
|注解名|参数|描述|
|-----|----|----|
|tag|一个命名空间id|指定函数的标签|
|tick|可选。一个非0整数，表示函数每隔多少tick执行一次。若不指定，则默认为每tick执行一次|指定函数为tick函数|
|load|无|指定函数为load函数|

### static关键字
mcfpp的函数有一个特殊的形参形式用于返回，即static参数。static使得函数中对此变量的改变会影响到传入此函数的变量。例如
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
最后结果a的值为1，b为0。

## 类
```cpp
class ClassName{
    classMember...
}
```
:::warning{title=Note!}
mcfpp中的类必须以大写字母开头。
:::
### 访问修饰符
- public 公开的
- protect 只有自己和子类能访问
- private （默认）私有的

### 类字段
`访问修饰符+普通的变量定义`
例如:`public int i;`
### 类函数
`访问修饰符+普通的函数定义`
例如:`public void qwq(){}`

**static是可用的**

### 构造函数
`访问修饰符+类名(参数){方法体}`
### 继承
`子类 extends 父类`
### super和this
调用父类构造方法：`super()`
调用自己的构造方法：`this()`
访问自身及父类的字段：`this.xxx`
访问静态成员：`ClassName.xxx`或`ClassName.function()`
:::warning{title=Note!}
在mcfpp中，要访问一个类的成员，必须使用this关键字或者使用类名进行访问。
:::

下面是一个完整的类的例子
```cpp
class Student{
    static int id;

    int stuid;
    int score;

    public Student(int score){
        this.stuid = id;
        Student.id++;
        this.score = score;
    }

    public getscore(static int score){
        score = this.score;
    }
}
```

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