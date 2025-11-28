import os 
import time 
from dataclasses import dataclass 
os.system("cls || clear") 

lista_cliente=[] 

#programaçao orientada a objetos study
@dataclass 
class Cliente:
    nome:str
    email:str 
    telefone:int 

    def mostrar_dados(self):
        print(f"Nome: {self.nome}")
        print(f"seu E-mail: {self.email}")
        print(f"Seu telefone: {self.telefone}") 

        # def mostrar_dados(self):
        #     print(f"nome: {self.nome}\nE-mail: {self.email}\nTelefone:{self.telefone}")

#funçao pra verificar se a lista esta vazia 
def lista_vazia(lista_cliente):
    if not lista_cliente:
        print("\nNão ha clientes cadastrado.") 
        return True 
    return False 

def adicionar_cliente(lista_cliente):
    print("\n----Adicionar novo cliente----") 
    nome=input("Digite seu nome") 
    email=input("Digite seu email:")
    telefone=input("Digite seu telefone:") 
    #quando tem uma classe nao é variavel é objeto
    novo_cliente = Cliente(nome=nome,email=email,telefone=telefone)
    lista_cliente.append(novo_cliente)
    print(f"\nCliente {nome} adicionado com sucesso") 

#funçao pra encontrar um cliente na lista 
def encontrar_cliente_por_nome(lista_cliente,nome_buscar):
    nome_buscar_lower=nome_buscar.lower() 
    for cliente in lista_cliente:
        if cliente.nome.lower()== nome_buscar_lower:
            return cliente
        return None #retorna sem conteudo
    
#funçao pra mostrar todos os clientes.
def mostrar_todos_clientes(lista_cliente): 
    if lista_vazia(lista_cliente):
        return 
    print("\n--- lista de cliente----") 
    # for posicao,cliente in enumerate(lista_cliente): sou gay
    for cliente in lista_cliente:
        cliente.mostrar_dados()

#funçao pra atualizar clientes.
def atualizar_clientes(lista_cliente):
    
    nome_buscar=input("digite o novo nome:")
    cliente_pra_atualizar=encontrar_cliente_por_nome(lista_cliente,nome_buscar) 

    if cliente_pra_atualizar:
        print("\nPessoa Encontrada")
        print("\ndigite os novos dados ou deixe em branco pra manter o valor atual") 

        print(f"\nNome atual:{cliente_pra_atualizar.nome}") 
        novo_nome=input("novo nome:")

        print(f"\nE-mail atual:{cliente_pra_atualizar.email}") 
        novo_e_mail=input("Novo e-mail:") 

        print(f"\nTelefone atual:{cliente_pra_atualizar.telefone}") 
        novo_telefone=int(input("Digite seu telefone:")) 
         
        if novo_nome:
            cliente_pra_atualizar.nome=novo_nome 
        if novo_e_mail:
            cliente_pra_atualizar.email=novo_e_mail 
        if novo_telefone:
            cliente_pra_atualizar.telefone=novo_telefone 
        print(f"\nDados do cliente:{nome_buscar} atualizado com sucesso") 
    else:
        print(f"\nCliente com nome:{nome_buscar} nao encontrado")  

def excluir_cliente(lista_cliente):
    if lista_vazia(lista_cliente):
        return
    
    mostrar_todos_clientes(lista_cliente)

    nome_buscar = input("\nDigite o noime do cliente que deseja excluir: ")

    cliente_para_remover = encontrar_cliente_por_nome(lista_cliente, nome_buscar)

    if cliente_para_remover:
        lista_cliente.remove(cliente_para_remover)
        print(f"\nCliente {cliente_para_remover.nome} excluído com sucesso! ")
    else:
        print('\nCliente com o nome {nome_buscar} excluído com sucesso')


#mostrando menu 
while True:
    print("""
-----Gerenciador De Cliente----- 
1-Adicionar 
2-Mostrar Resultado 
3-Atualizar 
4-Excluir
0-sar
""")  
    
    #carturar exceçao
    try:
    
        opcao=int(input("Digite uma das opçoes acima")) 
    except ValueError:
        print("\nEntrada invalida.Digite um numero") 
        time.sleep(2)
        os.system("cls||clear")
        continue #segue o codigo

    match opcao:
        case 1:
            adicionar_cliente(lista_cliente) 
        case 2:
            mostrar_todos_clientes(lista_cliente) 
        case 3:
            atualizar_clientes(lista_cliente) 
        case 4:
            excluir_cliente(lista_cliente) 
        case 0:
            print("Saindo do programa") 
            break 
        case _:
            print("\nOpção invalida. \ntente novamente") 

        #pausa antes de mudar o menu 
        
    if opcao !=1 and opcao !=0:
        time.sleep(3) 
    elif opcao==1:
        time.sleep(1) 
    if opcao !=0:
        os.system("cls || clear")

    

