<template>
    <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" sm="12">
    <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="name"
        class="elevation-1"
    >
        <template v-slot:top>
        <v-toolbar flat>
            <v-toolbar-title>Desenvolvedores</v-toolbar-title>
            <v-divider class="mx-4" inset></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Cadastrar</v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="8">
                        <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-select :items="selectSexo" v-model="editedItem.sexo" label="Sexo"></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="2">
                        <v-text-field v-model="editedItem.idade" type="number" label="Idade"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="7">
                        <v-text-field v-model="editedItem.hobby" label="Hobby"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                        <v-text-field v-model="editedItem.datanascimento" type="date" label="Data de Nascimento" ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                  <v-card-title class="headline">Tem certeza que quer deletar esse item?</v-card-title>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                  </v-card-actions>
              </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>
     </v-col>
  </v-row>
</template>

<script>
  import DeveloperDataService from "../services/DeveloperDataService";
  export default {
    name: "developers-list",
    data: () => ({
      selectSexo: ['M', 'F'],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Sexo', value: 'sexo' },
        { text: 'Idade', value: 'idade' },
        { text: 'Hobby', value: 'hobby' },
        { text: 'Data de nascimento', value: 'datanascimento' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        sexo: '',
        idade: 0,
        hobby: '',
        datanascimento: '',
      },
      defaultItem: {
        name: '',
        sexo: 'M',
        idade: 0,
        hobby: '',
        datanascimento: '',
      },
    }),
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = []
        DeveloperDataService.getAll()
        .then((response) => {
          this.desserts = response.data.response
        })
        .catch((e) => {
          console.log(e);
        });
      },
      
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.desserts.splice(this.editedIndex, 1)
        DeveloperDataService.delete(this.editedItem.id)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
          console.log(this.editedItem);
          DeveloperDataService.update(this.editedItem.id, JSON.stringify(this.editedItem))
        } else {
          DeveloperDataService.create(JSON.stringify(this.editedItem))
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>

<style>
.list {
  max-width: 900px;
}
.v-main {
    align-items: center;
}
</style>