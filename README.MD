# Lista de Tarefas com Alarmes e Verificações Diárias

    Este é um aplicativo de lista de tarefas que permite aos usuários gerenciar suas atividades diárias com alarmes e verificações de conclusão.

    ## Funcionalidades

    - **Adicionar Tarefas:** Os usuários podem adicionar novas tarefas à lista, especificando um nome e um horário.
    - **Alarmes:** O aplicativo notifica o usuário 10 minutos e 5 minutos antes do horário agendado para cada tarefa, além de notificar no horário exato.
    - **Verificações Diárias:** Os usuários podem marcar as tarefas como concluídas diariamente. Se uma tarefa não for marcada como concluída até o final do dia, ela será sinalizada como atrasada.
    - **Conclusão de Tarefas:** As tarefas são marcadas como concluídas (com fundo vermelho e mensagem "Finalizado") se o horário agendado já passou. Para tarefas de "Invasão de EXP", a conclusão é considerada 25 minutos após o horário agendado.
    - **Ordenação por Horário:** As tarefas são exibidas em ordem cronológica, facilitando a visualização das próximas atividades.
    - **Interface Amigável:** A interface é simples e intuitiva, com cores e estilos que facilitam a leitura e o uso.
    - **Persistência de Dados:** As tarefas e as verificações diárias são salvas no armazenamento local do navegador, garantindo que os dados não sejam perdidos ao fechar a página.

    ## Como Usar

    1.  **Adicionar uma Tarefa:**
        - Insira o nome da tarefa no campo "Task Name".
        - Selecione o horário da tarefa no campo de tempo.
        - Clique no botão "Add Task" para adicionar a tarefa à lista.
    2.  **Marcar uma Tarefa como Concluída:**
        - Clique na caixa de seleção ao lado da tarefa para marcá-la como concluída para o dia atual.
    3.  **Remover uma Tarefa:**
        - Clique no botão "Remove" ao lado da tarefa para removê-la da lista.
    4.  **Visualizar o Status da Tarefa:**
        - As tarefas com horários passados são marcadas com um fundo vermelho e a mensagem "Finalizado".
        - As tarefas marcadas como concluídas para o dia atual têm um fundo verde.
        - As tarefas que não foram marcadas como concluídas até o final do dia são sinalizadas como atrasadas.

    ## Tecnologias Utilizadas

    - React
    - Date-fns
    - Vite

    ## Instalação

    1.  Clone o repositório.
    2.  Execute `npm install` para instalar as dependências.
    3.  Execute `npm run dev` para iniciar o servidor de desenvolvimento.

    ## Contribuições

    Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

    ## Licença

    Este projeto está sob a licença MIT.
