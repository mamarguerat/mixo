using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using System.IO;
using System.Xml;

namespace behringer_routing
{
    public partial class application : Form
    {
        // X32scene x32;
        string workingPath;
        private List<Devices> mixers = new List<Devices>();
        private List<Devices> stageBoxes = new List<Devices>();
        DeviceTypes[] deviceTypes;

        enum ColumnName
        {
            Device,
            i1_8,
            i9_16,
            i17_24,
            i25_32,
            output,
            name,
            description
        };

        public application()
        {
            InitializeComponent();
        }
        private void application_Load(object sender, EventArgs e)
        {
            OpeningForm openingForm = new OpeningForm();
            openingForm.ShowDialog();
            workingPath = openingForm.workingPath;

            this.Text = workingPath;
            if (this.Text == "")
            {
                this.Close();
                return;
            }
            this.Text = "X32-Rooting - " + this.Text;

            deviceTypes = new DeviceTypes[4];
            deviceTypes[0] = new DeviceTypes("X32 Compact", "mixer", 16, 8);
            deviceTypes[1] = new DeviceTypes("X32", "mixer", 32, 16);
            deviceTypes[2] = new DeviceTypes("SD8", "stage box", 8, 8);
            deviceTypes[3] = new DeviceTypes("SD16", "stage box", 16, 8);

            mixers.Add(new Devices(deviceTypes[0]));   // Add X32 Compact
            mixers[0].master = true;
            mixers[0].name = "Main Console";
            dataGridCreateColumns();
            dataGridUpdate();
        }

        private void application_Shown(object sender, EventArgs e)
        {

        }

        private void dataGridCreateColumns()
        {
            DataGridViewColumn column;
            DataGridViewColumn comboboxColumn;
            DataGridViewComboBoxCell comboboxCell;
            DataGridViewComboBoxCell comboboxCellDevices;
            // Mixers
            comboboxCell = new DataGridViewComboBoxCell();
            comboboxCell.Items.Add("1");
            comboboxCell.Items.Add("2");
            comboboxCell.Items.Add("3");

            comboboxCellDevices = new DataGridViewComboBoxCell();
            foreach (DeviceTypes type in deviceTypes)
            {
                if (type.type == "mixer")
                {
                    comboboxCellDevices.Items.Add(type.name);
                }
            }
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "Device";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 150;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCellDevices;
            dataGridMixers.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "1-8";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridMixers.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "9-16";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridMixers.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "17-24";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridMixers.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "25-32";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridMixers.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "Output";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridMixers.Columns.Add(comboboxColumn);
            column = new DataGridViewColumn();
            column.Name = "Name";
            column.ReadOnly = false;
            column.Width = 120;
            column.SortMode = DataGridViewColumnSortMode.NotSortable;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridMixers.Columns.Add(column);
            column = new DataGridViewColumn();
            column.Name = "Description";
            column.ReadOnly = false;
            column.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            column.SortMode = DataGridViewColumnSortMode.NotSortable;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridMixers.Columns.Add(column);

            // StageBoxes
            comboboxCell = new DataGridViewComboBoxCell();
            comboboxCell.Items.Add("1");
            comboboxCell.Items.Add("2");
            comboboxCell.Items.Add("3");

            comboboxCellDevices = new DataGridViewComboBoxCell();
            foreach(DeviceTypes type in deviceTypes)
            {
                if(type.type == "stage box")
                {
                    comboboxCellDevices.Items.Add(type.name);
                }
            }
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "Device";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 150;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCellDevices;
            dataGridStageBoxes.Columns.Add(comboboxColumn);
            comboboxColumn = new DataGridViewComboBoxColumn();
            comboboxColumn.Name = "Output";
            comboboxColumn.ReadOnly = false;
            comboboxColumn.Width = 85;
            comboboxColumn.SortMode = DataGridViewColumnSortMode.NotSortable;
            comboboxColumn.CellTemplate = comboboxCell;
            dataGridStageBoxes.Columns.Add(comboboxColumn);
            column = new DataGridViewColumn();
            column.Name = "Name";
            column.ReadOnly = false;
            column.Width = 120;
            column.SortMode = DataGridViewColumnSortMode.NotSortable;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridStageBoxes.Columns.Add(column);
            column = new DataGridViewColumn();
            column.Name = "Description";
            column.ReadOnly = false;
            column.AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
            column.SortMode = DataGridViewColumnSortMode.NotSortable;
            column.CellTemplate = new DataGridViewTextBoxCell();
            dataGridStageBoxes.Columns.Add(column);
        }
        private void dataGridUpdate()
        {
            dataGridMixers.Rows.Clear();

            for(int i = 0; i < mixers.Count; i++)
            {
                dataGridMixers.Rows.Add();
                dataGridMixers["Device", i].Value = mixers[i].type.name;
                dataGridMixers["Name", i].Value = mixers[i].name;
                dataGridMixers["Description", i].Value = mixers[i].description;
            }

            dataGridStageBoxes.Rows.Clear();

            for (int i = 0; i < stageBoxes.Count; i++)
            {
                dataGridStageBoxes.Rows.Add();
                dataGridStageBoxes["Device", i].Value = stageBoxes[i].type.name;
                dataGridStageBoxes["Name", i].Value = stageBoxes[i].name;
                dataGridStageBoxes["Description", i].Value = stageBoxes[i].description;
            }
        }

        private void saveToolStripMenuItem_Click(object sender, EventArgs e)
        {
        }

        private void buttonDown_Click(object sender, EventArgs e)
        {
        }

        private void buttonUp_Click(object sender, EventArgs e)
        {
        }

        private void dataGridMixers_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            switch (dataGridMixers.CurrentCell.ColumnIndex)
            {
                case (int)ColumnName.name:
                    mixers[dataGridMixers.CurrentCell.RowIndex].name = (string)dataGridMixers.CurrentCell.Value;
                    break;
                case (int)ColumnName.description:
                    mixers[dataGridMixers.CurrentCell.RowIndex].description = (string)dataGridMixers.CurrentCell.Value;
                    break;
                default:
                    break;
            }
        }

        private void dataGridStageBoxes_CellEndEdit(object sender, DataGridViewCellEventArgs e)
        {
            switch (dataGridStageBoxes.CurrentCell.ColumnIndex)
            {
                case (int)ColumnName.name:
                    stageBoxes[dataGridStageBoxes.CurrentCell.RowIndex].name = (string)dataGridStageBoxes.CurrentCell.Value;
                    break;
                case (int)ColumnName.description:
                    stageBoxes[dataGridStageBoxes.CurrentCell.RowIndex].description = (string)dataGridStageBoxes.CurrentCell.Value;
                    break;
                default:
                    break;
            }
        }

        private void buttonAddMixer_Click(object sender, EventArgs e)
        {
            mixers.Add(new Devices(deviceTypes[0]));
            dataGridUpdate();
            dataGridMixers.Rows[0].Selected = false;
            dataGridMixers.Rows[dataGridMixers.RowCount - 1].Selected = true;
        }

        private void buttonRemoveMixer_Click(object sender, EventArgs e)
        {
            int lastIndex = 0;
            for (int i = 0; i < dataGridMixers.SelectedRows.Count; i++)
            {
                int index = dataGridMixers.SelectedRows[i].Index;
                if (index != 0)
                {
                    mixers.RemoveAt(dataGridMixers.SelectedRows[i].Index);
                }
                lastIndex = index;
            }
            dataGridUpdate();
            dataGridMixers.Rows[0].Selected = false;
            dataGridMixers.Rows[lastIndex > dataGridMixers.RowCount - 1 ? dataGridMixers.RowCount - 1 : lastIndex].Selected = true;
        }

        private void btnAddStageBox_Click(object sender, EventArgs e)
        {
            stageBoxes.Add(new Devices(deviceTypes[2]));
            dataGridUpdate();
            dataGridStageBoxes.Rows[0].Selected = false;
            dataGridStageBoxes.Rows[dataGridStageBoxes.RowCount - 1].Selected = true;
        }

        private void btnRemoveStageBox_Click(object sender, EventArgs e)
        {
            int lastIndex = 0;
            for (int i = 0; i < dataGridStageBoxes.SelectedRows.Count; i++)
            {
                int index = dataGridStageBoxes.SelectedRows[i].Index;
                stageBoxes.RemoveAt(dataGridStageBoxes.SelectedRows[i].Index);
                lastIndex = index;
            }
            dataGridUpdate();
            if(lastIndex != 0)
            {
                dataGridStageBoxes.Rows[0].Selected = false;
                dataGridStageBoxes.Rows[lastIndex > dataGridStageBoxes.RowCount - 1 ? dataGridStageBoxes.RowCount - 1 : lastIndex].Selected = true;
            }
        }
    }
}
